from flask import abort, Response, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import current_user
from sqlalchemy import exc
from backend.common.permissions import roles_allowed
from backend.app import db
from backend.models import Team, Tribe, TeamUserLink, User


class TeamsRes(Resource):
    """Teams collection."""

    @roles_allowed(['admin', 'editor'])
    def post(self, tribe_id):
        """Creates new team with given name in specified tribe."""

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
        """Lists all existing teams in given tribe."""

        Tribe.get_if_exists(tribe_id)

        teams = Team.query.filter_by(tribe_id=tribe_id,
                                     deleted=False).all()

        response = jsonify([t.serialize() for t in teams])
        response.status_code = 200
        return response


class TeamRes(Resource):
    """Single team identified by id."""

    @roles_allowed(['admin', 'editor'])
    def get(self, team_id):
        """Returns data of team with given id."""

        team = Team.get_if_exists(team_id)

        response = jsonify(team.serialize())
        response.status_code = 200
        return response

    @roles_allowed(['admin', 'editor'])
    def put(self, team_id):
        """Updates team with given id."""

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
        """Allows partial updates of team with given id."""

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
        """Deletes team with given id."""

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
        """"Returns list of all managers of the team with specified id."""

        team = Team.get_if_exists(team_id)
        Tribe.validate_access(team.tribe_id, current_user)

        manager_links = TeamUserLink.query.filter_by(team_id=team_id,
                                                     manager=True).all()

        response = jsonify([l.user.serialize() for l in manager_links])
        response.status_code = 200
        return response


class TeamManagerRes(Resource):
    """Single team manager resource."""

    @roles_allowed(['admin', 'editor'])
    def put(self, team_id, user_id):
        """Adds user with given id to the managers of the team."""

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
        """Removes user with given id from the managers of the team."""

        team = Team.get_if_exists(team_id)
        user = User.get_if_exists(user_id)
        Tribe.validate_access(team.tribe_id, current_user)

        manager_link = TeamUserLink.query.filter_by(user_id=user_id,
                                                    team_id=team_id,
                                                    manager=True).first()

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
        """Returns all members of the team."""

        team = Team.get_if_exists(team_id)
        Tribe.validate_access(team.tribe_id, current_user)

        user_links = TeamUserLink.query.filter_by(team_id=team_id,
                                                  manager=False).all()

        response = jsonify([l.user.serialize() for l in user_links])
        response.status_code = 200
        return response


class TeamUserRes(Resource):
    """Single team member."""

    @roles_allowed(['admin', 'editor'])
    def put(self, team_id, user_id):
        """Adds user with given id to the team."""

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
        """Deletes user with given id from team."""

        team = Team.get_if_exists(team_id)
        user = User.get_if_exists(user_id)
        Tribe.validate_access(team.tribe_id, current_user)

        user_link = TeamUserLink.query.filter_by(user_id=user_id,
                                                 team_id=team_id,
                                                 manager=False).first()

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
