from flask import abort, Response, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import current_user
from sqlalchemy import exc
from backend.common.permissions import roles_allowed
from backend.app import db
from backend.models import Team, Tribe


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

        response = Response()
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

        response = Response()
        response.status_code = 200
        return response

    @roles_allowed(['admin', 'editor'])
    def delete(self, team_id):
        """Deletes team with given id."""

        team = Team.get_if_exists(team_id)
        Tribe.validate_access(team.tribe_id, current_user)

        try:
            db.session.delete(team)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = Response()
        response.status_code = 200
        return response

