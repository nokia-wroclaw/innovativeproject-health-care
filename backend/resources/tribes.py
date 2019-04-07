from flask import abort, request, jsonify
from flask_restful import Resource
from sqlalchemy import exc
from flask_jwt_extended import get_jwt_identity
from backend.common.permissions import editor_required
from backend.models import User, Tribe
from backend.app import db


class Tribes(Resource):
    '''Tribes collection resource.'''

    @editor_required
    def post(self):
        '''Creates a new tribe with given name.'''

        json = request.get_json()
        if 'name' not in json:
            abort(400, 'No tribe data given.')

        editor = User.from_id(get_jwt_identity())
        tribe = Tribe(json['name'])
        tribe.editors.append(editor)

        try:
            db.session.add(tribe)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = jsonify(tribe.serialize())
        response.headers['Location'] = '/tribes/%d' % tribe.id
        response.status_code = 201
        return response

    @editor_required
    def get(self):
        '''Lists all exisiting tribes.'''

        tribes = Tribe.query.all()

        response = jsonify([t.serialize() for t in tribes])
        response.status_code = 200
        return response
