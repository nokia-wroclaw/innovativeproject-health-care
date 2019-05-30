from datetime import timedelta
from flask import abort, request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, current_user
from backend.common.permissions import roles_allowed
from backend.common.ldapconn import LdapConn
from backend.models import User, Tribe, Team
from backend.app import app


class AuthRes(Resource):
    """User authentication"""

    def __init__(self):
        self.ldap = LdapConn()

    def post(self):
        """Authenticates user.

        This method authenticates users credentials sent by HTTP Basic Auth.
        If authentication is successful JWT containing user data is returned.
        """

        credentials = request.authorization

        # If user didn't send credentials
        if not credentials:
            abort(401)

        auth = self.ldap.authenticate(credentials.username,
                                      credentials.password)

        # If credentials are incorrect
        if not auth:
            abort(401)

        # Retrieve user data from LDAP and create user object
        ldap_user = self.ldap.search(credentials.username, True)[0]
        user = User.from_ldap(ldap_user)

        # Abort if user is not in db and is not an admin
        if (user.in_db() or user.is_admin()) is False:
            abort(401)

        exp = app.config['JWT_EXP']
        token = create_access_token(user, expires_delta=timedelta(hours=exp))

        response = jsonify({'access_token': token})
        response.status_code = 200
        return response


class UsersRes(Resource):
    """All users available to system."""

    @roles_allowed(['admin', 'editor', 'manager'])
    def get(self):
        """ Get available users from db and LDAP. Search phrase required."""

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
        """Get full info of the user with specified id."""

        user = User.get_if_exists(user_id)

        response = jsonify(user.serialize(verbose=True))
        response.status_code = 200
        return response


class UserTeamsRes(Resource):
    """Collection of all teams user is assigned to, both as a manager
    and a member."""

    @roles_allowed(['manager', 'user'])
    def get(self, user_id):
        """Returns info of all the teams user is either managing or is
        member of.
        Filtering is done by `role` parameter. Possible values: manger,
        member."""

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

    @roles_allowed(['editor', 'user'])
    def get(self, user_id):
        """Returns info of all the tribes in which user is editor, manager
        or member.
        Filtering is done by `role` parameter. Possible values: editor,
        member.
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
