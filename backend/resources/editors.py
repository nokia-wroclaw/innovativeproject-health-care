from flask import jsonify
from flask_restful import Resource
from backend.common.permissions import roles_allowed
from backend.models import User


class Editors(Resource):
    '''Editors collection.'''

    @roles_allowed(['admin'])
    def get(self):
        '''Get all editors.'''

        editors = User.query.filter_by(editor=True).all()

        response = jsonify([e.serialize() for e in editors])
        response.status_code = 200
        return response
