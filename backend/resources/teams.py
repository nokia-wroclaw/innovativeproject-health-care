from flask import abort, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import current_user
from sqlalchemy import exc
from backend.common.permissions import roles_allowed
from backend.app import db
from backend.models import Team, Tribe


class Teams(Resource):
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
        response.headers['Location'] = '/tribes/%d/teams/%d'\
                                       % (team.tribe_id, team.id)
        response.status_code = 201

        return response

    @roles_allowed(['admin', 'editor'])
    def get(self, tribe_id):
        """Lists all existing teams in given tribe."""

        Tribe.get_if_exists(tribe_id)

        teams = Team.query.filter_by(tribe_id=tribe_id).all()

        response = jsonify([t.serialize() for t in teams])
        response.status_code = 200
        return response

