from flask import jsonify
from flask_restful import Resource
from backend.common.permissions import admin_required
from backend.models import User


class Editors(Resource):
    '''Editors collection.'''

    @admin_required
    def get(self):
        '''Get all editors.'''

        editors = User.query.filter_by(editor=True).all()

        response = jsonify([e.serialize() for e in editors])
        response.status_code = 200
        return response
