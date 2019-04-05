from flask import Response, abort
from flask_restful import Resource
from sqlalchemy import exc
from backend.common.permissions import admin_required
from backend.app import db
from backend.models import User


class Editor(Resource):
    '''Editor management: create, delete.'''

    @admin_required
    def put(self, user_id):
        '''Creates editor with given id.'''

        # Get user data from db or ldap
        user = User.from_id(user_id)

        # If id cannot be found neither in db nor ldap
        if user is None:
            abort(404, 'Could not find user with given identity.')

        # If user exists in database and already is an editor
        if (user.in_db() and user.is_editor()) is True:
            response = Response()
            response.status_code = 200
            return response

        # Set user as editor
        user.editor = True

        # Try to insert / update in db, catch exceptions
        try:
            db.session.add(user)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = Response()
        response.status_code = 201
        return response

    @admin_required
    def delete(self, user_id):
        '''Deletes editor with given id.'''

        # Get user data from db or ldap
        user = User.from_id(user_id)

        # If id cannot be found neither in db nor ldap
        if user is None:
            abort(404, 'Could not find user with given identity.')

        # If user is not in db or is not an editor
        if (user.in_db() or user.is_editor()) is False:
            abort(404, 'Requested editor does not exist.')

        user.editor = False   
        user.editing.clear()
        
        try:
            db.session.add(user)
            db.session.commit() 
        except exc.SQLAlchemyError:
            abort(400)

        response = Response()
        response.status_code = 200
        return response
