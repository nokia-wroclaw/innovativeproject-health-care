from datetime import timedelta

from flask import abort, request, jsonify
from flask_jwt_extended import create_access_token, current_user
from flask_restful import Resource

from backend.app import app
from backend.common.ldapconn import LdapConn
from backend.common.permissions import roles_allowed
from backend.models import User, Tribe, Team


class AuthRes(Resource):
    """User authentication"""

    def __init__(self):
        self.ldap = LdapConn()

    def post(self):
        """Authenticate user.
        This method authenticates user's credentials sent by HTTP Basic Auth.\
        If authentication is successful JWT containing user data is returned.
        ---
        tags:
          - users
        security:
          - basicAuth: []
        responses:
          401:
            description: No credentials or credentials invalid.
          200:
            description: Correctly logged in. JWT is returned.
        """

        credentials = request.authorization

        # If user didn't send credentials
        if not credentials:
            abort(401, 'Invalid username or password.')

        auth = self.ldap.authenticate(credentials.username,
                                      credentials.password)

        # If credentials are incorrect
        if not auth:
            abort(401, 'Invalid username or password.')

        # Retrieve user data from LDAP and create user object
        ldap_user = self.ldap.search(credentials.username, True)[0]
        user = User.from_ldap(ldap_user)

        # Abort if user is not in db and is not an admin
        if (user.in_db() or user.is_admin()) is False:
            abort(401, 'Sorry but currently you are not authorized to access\
                        SQUAD HEALTH CARE application. Please contact with \
                        your tribe change agent for details or/and \
                        access rights.')

        exp = app.config['JWT_EXP']
        token = create_access_token(user, expires_delta=timedelta(hours=exp))

        response = jsonify({'access_token': token})
        response.status_code = 200
        return response


class UsersRes(Resource):
    """Collection of all users available to the application (both in LDAP
    and in database."""

    @roles_allowed(['admin', 'editor', 'manager'])
    def get(self):
        """Search all users.
        Roles allowed: admin, editor, manager.
        ---
        tags:
          - users
        security:
          - bearerAuth: []
        parameters:
          - in: query
            name: q
            schema:
              type: string
            required: true
            description: Search phrase, minimum 4 characters long.
        responses:
          200:
            description: A list of of full users info.
          400:
            description: No search phrase given or phrase to short.
        """

        args = request.args
        if not args['q']:
            abort(400, 'No search phrase given.')
        phrase = args['q']

        if len(phrase) <= 3:
            abort(400, 'Search phrase too short, minimum length is 4 character')

        ldap = LdapConn()
        matches = ldap.search(phrase)
        users = [User.from_ldap(m) for m in matches]
        users.sort(key=lambda u: u.full_name)

        response = jsonify([u.serialize(True) for u in users])
        response.status_code = 200
        return response


class UserRes(Resource):
    """Single user with specified id."""

    @roles_allowed(['admin', 'editor', 'manager'])
    def get(self, user_id):
        """Get full info of the single user.
        Roles allowed: admin, editor, manager.
        ---
        tags:
          - users
        security:
          - bearerAuth: []
        parameters:
          - in: path
            name: user_id
            schema:
              type: integer
            required: true
            description: Id of the user.
        responses:
          200:
            description: Full user info.
          404:
            description: User with requested id doesn't exist.
        """

        user = User.get_if_exists(user_id)

        response = jsonify(user.serialize(verbose=True))
        response.status_code = 200
        return response


class UserTeamsRes(Resource):
    """Collection of all teams user is assigned to, both as a manager
    and a member."""

    @roles_allowed(['manager', 'user'])
    def get(self, user_id):
        """Get user's teams.
        Returns full info about all teams user is either managing or is\
        a member of. Results can be filtered by the role in teams.
        Accessing data of another user is forbidden.
        Roles allowed: manager, user.
        ---
        tags:
          - users
        security:
          - bearerAuth: []
        parameters:
          - in: path
            name: user_id
            schema:
              type: integer
            required: true
            description: Id of the user.
          - in: query
            name: role
            schema:
              type: string
              enum: [manager, member]
            required: true
            description: Filtering by user role. Allows to fetch only teams\
              user is managing or only teams user is a member of.
        responses:
          200:
            description: A list of full teams info.
          403:
            description: Forbidden. Probably trying to fetch another\
              user's data.
          404:
            description: User with requested id doesn't exist.
        """

        # Users can fetch only their own teams
        if current_user.id != int(user_id):
            abort(403)

        user = User.get_if_exists(user_id)

        if 'role' not in request.args:
            abort(400)

        role = request.args['role']
        if role not in ['manager', 'member']:
            abort(400)
        req_role = True if role == 'manager' else False

        team_links = [l for l in user.teams if l.manager is req_role]
        team_links.sort(key=lambda l: l.team.name)

        response = jsonify([l.team.serialize() for l in team_links])
        response.status_code = 200
        return response


class UserTribesRes(Resource):
    """Collection of all tribes user is assigned to, both as member of the
    teams in this tribe and as an editor."""

    @roles_allowed(['editor', 'manager', 'user'])
    def get(self, user_id):
        """Get user's tribes.
        Get full info about all tribes user in which user is editor, manager\
        or member. Results can be filtered by the role in tribes.
        Accessing data of another user is forbidden.
        Roles allowed: editor, manager, user.
        ---
        tags:
          - users
        security:
          - bearerAuth: []
        parameters:
          - in: path
            name: user_id
            schema:
              type: integer
            required: true
            description: Id of the user.
          - in: query
            name: role
            schema:
              type: string
              enum: [editor, manager, member]
            required: false
            description: Filtering by user role. Allows to fetch only tribes\
              in which user acts as editor, manager or member.
        responses:
          200:
            description: A list of full tribes info.
          403:
            description: Forbidden. Probably trying to fetch another\
              user's data.
          404:
            description: User with requested id doesn't exist.
        """

        # Users can fetch only their own teams
        if current_user.id != int(user_id):
            abort(403)

        user = User.get_if_exists(user_id)

        tribes = set()
        if 'role' not in request.args:
            tribes.update(user.editing)
            tribes.update([l.team.tribe for l in user.teams])
        elif request.args['role'] == 'editor':
            tribes = user.editing
        elif request.args['role'] == 'member':
            tribes = (
                Tribe.query
                .join(Tribe.teams)
                .join(Team.users)
                .filter_by(manager=False)
                .order_by(Tribe.name)
                .all()
            )
        else:
            abort(403)
            return

        tribes = list(tribes)
        tribes.sort(key=lambda t: t.name)

        response = jsonify([t.serialize() for t in tribes])
        response.status_code = 200
        return response
