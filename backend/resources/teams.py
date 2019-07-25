from flask import abort, Response, jsonify, request
from flask_jwt_extended import current_user
from flask_restful import Resource
from sqlalchemy import exc

from backend.app import db
from backend.common.permissions import roles_allowed
from backend.models import Team, Tribe, TeamUserLink, User, Answer


class TeamsRes(Resource):
    """Teams collection."""

    @roles_allowed(['admin', 'editor'])
    def post(self, tribe_id):
        """Create a new team.
        Creates a new team with given name.
        Roles allowed: admin, editor.
        ---
        tags:
          - teams
        security:
          - bearerAuth: []
        consumes:
          - application/json
        parameters:
          - in: path
            name: tribe_id
            required: true
            description: Id of the tribe.
            schema:
              type: integer
          - in: body
            name: team
            required: true
            description: Team object.
            schema:
              $ref: '#/definitions/Team'
        responses:
          201:
            description: Success.
            headers:
              Location:
                description: URI of the created team.
                type: string
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this team.
          400:
            description: No tribe name given.
        """

        Tribe.get_if_exists(tribe_id)
        Tribe.validate_access(tribe_id, current_user)

        json = request.get_json()
        if 'name' not in json:
            abort(400, 'No team data given')

        team = Team(tribe_id, json['name'])

        try:
            db.session.add(team)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = jsonify(team.serialize())
        response.headers['Location'] = '/tribes/%d/teams/%d' \
                                       % (team.tribe_id, team.id)
        response.status_code = 201

        return response

    @roles_allowed(['admin', 'editor'])
    def get(self, tribe_id):
        """Get all teams in a tribe.
        Roles allowed: admin, editor.
        ---
        tags:
          - teams
        security:
          - bearerAuth: []
        parameters:
          - in: path
            name: tribe_id
            required: true
            description: Id of the tribe.
            schema:
              type: integer
        responses:
          200:
            description: Success. Return list of teams.
          404:
            description: Tribe with requested id doesn't exist.
        """

        Tribe.get_if_exists(tribe_id)

        teams = (
            Team.query
            .filter_by(tribe_id=tribe_id, deleted=False)
            .order_by(Team.name.asc())
            .all()
        )

        response = jsonify([t.serialize() for t in teams])
        response.status_code = 200
        return response


class TeamRes(Resource):
    """Single team identified by id."""

    @roles_allowed(['admin', 'editor'])
    def get(self, team_id):
        """Get full info of a team.
        Roles allowed: admin, editor.
        ---
        tags:
          - teams
        security:
          - bearerAuth: []
        parameters:
          - in: path
            name: team_id
            required: true
            description: Id of the team.
            schema:
              type: integer
        responses:
          200:
            description: Success. Returns team info.
          404:
            description: Team with requested id doesn't exist.
        """

        team = Team.get_if_exists(team_id)

        response = jsonify(team.serialize())
        response.status_code = 200
        return response

    @roles_allowed(['admin', 'editor'])
    def put(self, team_id):
        """Update team.
        Roles allowed: admin, editor.
        ---
        tags:
          - teams
        security:
          - bearerAuth: []
        consumes:
          - application/json
        parameters:
          - in: path
            name: team_id
            required: true
            description: Id of the team.
            schema:
              type: integer
          - in: body
            name: team
            required: true
            description: Team object.
            schema:
              $ref: '#/definitions/Team'
        responses:
          200:
            description: Success. Returns team info.
          400:
            description: No team data given.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this team.
          404:
            description: Team with requested id doesn't exist.
        """

        team = Team.get_if_exists(team_id)
        Tribe.validate_access(team.tribe_id, current_user)

        json = request.get_json()
        if 'name' not in json or 'tribe_id' not in json:
            abort(400, 'No team data given.')

        Tribe.get_if_exists(json['tribe_id'])
        team.name = json['name']
        team.tribe_id = json['tribe_id']

        try:
            db.session.add(team)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = jsonify(team.serialize())
        response.status_code = 200
        return response

    @roles_allowed(['admin', 'editor'])
    def patch(self, team_id):
        """Partially update team.
        Roles allowed: admin, editor.
        ---
        tags:
          - teams
        security:
          - bearerAuth: []
        consumes:
          - application/json
        parameters:
          - in: path
            name: team_id
            required: true
            description: Id of the team.
            schema:
              type: integer
          - in: body
            name: team
            required: true
            description: Team object. Not all properties are required.
            schema:
              $ref: '#/definitions/Team'
        responses:
          200:
            description: Success. Returns team info.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this team.
          404:
            description: Team with requested id doesn't exist.
        """

        team = Team.get_if_exists(team_id)
        Tribe.validate_access(team.tribe_id, current_user)

        json = request.get_json()

        if 'name' in json:
            team.name = json['name']

        if 'tribe_id' in json:
            Tribe.get_if_exists(json['tribe_id'])
            team.tribe_id = json['tribe_id']

        try:
            db.session.add(team)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = jsonify(team.serialize())
        response.status_code = 200
        return response

    @roles_allowed(['admin', 'editor'])
    def delete(self, team_id):
        """Delete team.
        Roles allowed: admin, editor.
        ---
        tags:
          - teams
        security:
          - bearerAuth: []
        parameters:
          - in: path
            name: team_id
            required: true
            description: Id of the team.
            schema:
              type: integer
        responses:
          204:
            description: Success.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this team.
          404:
            description: Team with requested id doesn't exist.
        """

        team = Team.get_if_exists(team_id)
        Tribe.validate_access(team.tribe_id, current_user)
        team.users.clear()
        team.deleted = True

        try:
            db.session.add(team)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = Response()
        response.status_code = 204
        return response


class TeamManagersRes(Resource):
    """Collection of managers of the specific team."""

    @roles_allowed(['admin', 'editor'])
    def get(self, team_id):
        """Get managers of the team.
        Roles allowed: admin, editor.
        ---
        tags:
          - teams
        security:
          - bearerAuth: []
        properties:
          - in: path
            name: team_id
            required: true
            description: Id of the team.
            schema:
              - type: integer
        responses:
          200:
            description: Success. Returns list of the managers.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this team.
          404:
            description: Team with requested id doesn't exist.
        """

        team = Team.get_if_exists(team_id)
        Tribe.validate_access(team.tribe_id, current_user)

        manager_links = (
            TeamUserLink.query
            .filter_by(team_id=team_id, manager=True)
            .join(TeamUserLink.user)
            .order_by(User.full_name.asc())
            .all()
        )

        response = jsonify([l.user.serialize() for l in manager_links])
        response.status_code = 200
        return response


class TeamManagerRes(Resource):
    """Single team manager resource."""

    @roles_allowed(['admin', 'editor'])
    def put(self, team_id, user_id):
        """Add manager to the team.
        Roles allowed: admin, editor.
        ---
        tags:
          - teams
        security:
          - bearerAuth: []
        properties:
          - in: path
            name: team_id
            required: true
            description: Id of the team.
            schema:
              - type: integer
          - in: path
            name: user_id
            required: true
            description: Id of the user.
            schema:
              - type: integer
        responses:
          201:
            description: Success.
          204:
            description: User is already a manager in this team.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this team.
          404:
            description: Team or user with requested id doesn't exist.
        """

        team = Team.get_if_exists(team_id)
        user = User.get_if_exists(user_id)
        Tribe.validate_access(team.tribe_id, current_user)

        if int(team_id) in user.managing_ids():
            response = Response()
            response.status_code = 204
            return response

        manager_link = TeamUserLink(team_id=team_id,
                                    user_id=user_id,
                                    manager=True)
        team.users.append(manager_link)

        try:
            db.session.add(user)
            db.session.add(team)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = Response()
        response.status_code = 201
        return response

    @roles_allowed(['admin', 'editor'])
    def delete(self, team_id, user_id):
        """Remove manager from the team.
        Roles allowed: admin, editor.
        ---
        tags:
          - teams
        security:
          - bearerAuth: []
        properties:
          - in: path
            name: team_id
            required: true
            description: Id of the team.
            schema:
              - type: integer
          - in: path
            name: user_id
            required: true
            description: Id of the user.
            schema:
              - type: integer
        responses:
          204:
            description: Success.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this team.
          404:
            description: Team or user with requested id doesn't exist.
        """

        team = Team.get_if_exists(team_id)
        user = User.get_if_exists(user_id)
        Tribe.validate_access(team.tribe_id, current_user)

        manager_link = (
            TeamUserLink.query
            .filter_by(user_id=user_id, team_id=team_id, manager=True)
            .first()
        )

        if manager_link is None:
            abort(404, 'Requested manager does not exist.')

        try:
            db.session.delete(manager_link)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        user.revalidate()

        response = Response()
        response.status_code = 204
        return response


class TeamUsersRes(Resource):
    """Collection of team members."""

    @roles_allowed(['admin', 'editor'])
    def get(self, team_id):
        """Get members of the team.
        Roles allowed: admin, editor.
        ---
        tags:
          - teams
        security:
          - bearerAuth: []
        properties:
          - in: path
            name: team_id
            required: true
            description: Id of the team.
            schema:
              - type: integer
        responses:
          200:
            description: Success. Returns list of the members.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this team.
          404:
            description: Team with requested id doesn't exist.
        """

        team = Team.get_if_exists(team_id)
        Tribe.validate_access(team.tribe_id, current_user)

        user_links = (
            TeamUserLink.query
            .filter_by(team_id=team_id, manager=False)
            .join(TeamUserLink.user)
            .order_by(User.full_name)
            .all()
        )

        response = jsonify([l.user.serialize() for l in user_links])
        response.status_code = 200
        return response


class TeamUserRes(Resource):
    """Single team member."""

    @roles_allowed(['admin', 'editor'])
    def put(self, team_id, user_id):
        """Add member to the team.
        Roles allowed: admin, editor.
        ---
        tags:
          - teams
        security:
          - bearerAuth: []
        properties:
          - in: path
            name: team_id
            required: true
            description: Id of the team.
            schema:
              - type: integer
          - in: path
            name: user_id
            required: true
            description: Id of the user.
            schema:
              - type: integer
        responses:
          201:
            description: Success.
          204:
            description: User is already a member in this team.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this team.
          404:
            description: Team or user with requested id doesn't exist.
        """

        team = Team.get_if_exists(team_id)
        user = User.get_if_exists(user_id)
        Tribe.validate_access(team.tribe_id, current_user)

        if int(team_id) in user.team_ids():
            response = Response()
            response.status_code = 204
            return response

        user_link = TeamUserLink(team_id=team_id,
                                 user_id=user_id,
                                 manager=False)
        team.users.append(user_link)

        try:
            db.session.add(user)
            db.session.add(team)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = Response()
        response.status_code = 201
        return response

    @roles_allowed(['admin', 'editor'])
    def delete(self, team_id, user_id):
        """Remove member from the team.
        Roles allowed: admin, editor.
        ---
        tags:
          - teams
        security:
          - bearerAuth: []
        properties:
          - in: path
            name: team_id
            required: true
            description: Id of the team.
            schema:
              - type: integer
          - in: path
            name: user_id
            required: true
            description: Id of the user.
            schema:
              - type: integer
        responses:
          204:
            description: Success.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this team.
          404:
            description: Team or user with requested id doesn't exist.
        """

        team = Team.get_if_exists(team_id)
        user = User.get_if_exists(user_id)
        Tribe.validate_access(team.tribe_id, current_user)

        user_link = (
            TeamUserLink.query
            .filter_by(user_id=user_id, team_id=team_id, manager=False)
            .first()
        )

        if user_link is None:
            abort(404, 'Requested member does not exist.')

        try:
            db.session.delete(user_link)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        user.revalidate()

        response = Response()
        response.status_code = 204
        return response


class TeamAnswersRes(Resource):

    @roles_allowed(['admin'])
    def get(self, team_id):
        answers = Answer.query.filter_by(team_id=team_id).order_by(Answer.date.desc()).all()
        response = jsonify([ans.serialize() for ans in answers])
        response.status_code = 200
        return response

    @roles_allowed(['admin'])
    def delete(self, team_id):
        args = request.args
        if 'date' not in args:
            abort(400)

        db.session.query(Answer).filter_by(team_id=team_id, date=args['date']).delete()
        db.session.commit()

        response = Response()
        response.status_code = 200
        return response
