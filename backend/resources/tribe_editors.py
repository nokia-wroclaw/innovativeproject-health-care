from flask import abort, Response
from flask_jwt_extended import current_user
from flask_restful import Resource
from backend.app import db
from backend.common.permissions import roles_allowed
from backend.models import User, Tribe


class TribeEditors(Resource):
    """Editors of specific tribe."""

    @roles_allowed(['admin'])
    def put(self, tribe_id, user_id):
        """Assigns user as an editor of the tribe."""

        Tribe.validate_access(tribe_id, current_user)
        tribe = Tribe.get_if_exists(tribe_id)

        user = User.from_id(user_id)

        if user is None or (user.is_editor() is False):
            abort(404, 'Could not find editor with given id.')

        if user in tribe.editors:
            response = Response()
            response.status_code = 200
            return response

        tribe.editors.append(user)

        db.session.add(tribe)
        db.session.commit()

        response = Response()
        response.status_code = 201
        return response

    @roles_allowed(['admin'])
    def delete(self, tribe_id, user_id):
        """Removes user from editors of the tribe."""

        Tribe.validate_access(tribe_id, current_user)
        tribe = Tribe.get_if_exists(tribe_id)

        user = User.from_id(user_id)

        if user not in tribe.editors:
            abort(404, 'Could not find editor with given id.')

        tribe.editors.remove(user)

        db.session.add(tribe)
        db.session.commit()

        response = Response()
        response.status_code = 200
        return response
