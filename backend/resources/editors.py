from flask import jsonify, Response, abort
from flask_restful import Resource
from sqlalchemy import exc
from backend.common.permissions import roles_allowed
from backend.app import db
from backend.models import User


class EditorsRes(Resource):
    """Editors collection."""

    @roles_allowed(['admin'])
    def get(self):
        """Get all editors."""

        editors = User.query.filter_by(editor=True).all()

        response = jsonify([e.serialize() for e in editors])
        response.status_code = 200
        return response


class EditorRes(Resource):
    """Single editor resource: create, delete."""

    @roles_allowed(['admin'])
    def put(self, user_id):
        """Creates editor with given id."""

        # Get user data from db or ldap
        user = User.from_id(user_id)

        # If id cannot be found neither in db nor ldap
        if user is None:
            abort(404, 'Could not find user with given identity.')

        # If user exists in database and already is an editor
        if (user.in_db() and user.is_editor()) is True:
            response = Response()
            response.status_code = 204
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

    @roles_allowed(['admin'])
    def delete(self, user_id):
        """Deletes editor with given id."""

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

        user.revalidate()

        response = Response()
        response.status_code = 204
        return response
