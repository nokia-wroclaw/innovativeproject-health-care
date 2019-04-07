from flask import Response, abort, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import current_user
from sqlalchemy import exc
from backend.common.permissions import editor_required
from backend.app import db
from backend.models import Tribe


class TribeRes(Resource):
    '''Single tribe identified by id.'''

    @editor_required
    def put(self, tribe_id):
        '''Updates tribe with given id.'''

        self.validate_access(tribe_id, current_user)
        tribe = self.get_if_exists(tribe_id)

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

    def get(self, tribe_id):
        '''Returns data of tribe with given id.'''

        tribe = self.get_if_exists(tribe_id)

        response = jsonify(tribe.serialize(verbose=True))
        response.status_code = 200
        return response

    @editor_required
    def delete(self, tribe_id):
        '''Deletes tribe with given id.'''

        self.validate_access(tribe_id, current_user)
        tribe = self.get_if_exists(tribe_id)

        try:
            db.session.delete(tribe)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = Response()
        response.status_code = 200
        return response

    def get_if_exists(self, tribe_id):
        '''Fetches tribe with given id if it exists, aborts with
        404 status otherwise.
        '''

        tribe = Tribe.query.filter_by(id=tribe_id).first()
        if tribe is None:
            abort(404, 'Could not find tribe with given id.')
        return tribe

    def validate_access(self, tribe_id, user):
        '''Checks if given user has rights to edit tribe with given id.
        Aborts with 403 code if not.
        '''

        if (user.is_admin() is False
                and int(tribe_id) not in user.editing_ids()):
            return abort(403)
