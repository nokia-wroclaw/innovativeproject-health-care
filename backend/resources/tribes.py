from flask import abort, request, jsonify
from flask_restful import Resource
from sqlalchemy import exc
from flask_jwt_extended import current_user
from backend.common.permissions import roles_allowed
from backend.models import Tribe
from backend.app import db


class Tribes(Resource):
    """Tribes collection resource."""

    @roles_allowed(['admin', 'editor'])
    def post(self):
        """Creates a new tribe with given name."""

        json = request.get_json()
        if 'name' not in json:
            abort(400, 'No tribe data given.')

        tribe = Tribe(json['name'])

        if current_user.is_editor():
            tribe.editors.append(current_user)

        try:
            db.session.add(tribe)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = jsonify(tribe.serialize())
        response.headers['Location'] = '/tribes/%d' % tribe.id
        response.status_code = 201
        return response

    @roles_allowed(['admin', 'editor'])
    def get(self):
        """Lists all exisiting tribes."""

        tribes = Tribe.query.all()

        response = jsonify([t.serialize() for t in tribes])
        response.status_code = 200
        return response
