from flask import Response, abort, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import current_user
from sqlalchemy import exc
from backend.common.permissions import roles_allowed
from backend.app import db
from backend.models import Tribe


class TribeRes(Resource):
    """Single tribe identified by id."""

    @roles_allowed(['admin', 'editor'])
    def put(self, tribe_id):
        """Updates tribe with given id."""

        Tribe.validate_access(tribe_id, current_user)
        tribe = Tribe.get_if_exists(tribe_id)

        json = request.get_json()
        if 'name' not in json:
            abort(400, 'No tribe data given.')

        tribe.name = json['name']

        try:
            db.session.add(tribe)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = Response()
        response.status_code = 200
        return response

    @roles_allowed(['admin', 'editor'])
    def get(self, tribe_id):
        """Returns data of tribe with given id."""

        tribe = Tribe.get_if_exists(tribe_id)

        response = jsonify(tribe.serialize(verbose=True))
        response.status_code = 200
        return response

    @roles_allowed(['admin', 'editor'])
    def delete(self, tribe_id):
        """Deletes tribe with given id."""

        Tribe.validate_access(tribe_id, current_user)
        tribe = Tribe.get_if_exists(tribe_id)

        try:
            db.session.delete(tribe)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = Response()
        response.status_code = 200
        return response

