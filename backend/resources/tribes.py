from flask import Response, abort, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import current_user
from sqlalchemy import exc
from backend.common.permissions import roles_allowed
from backend.app import db
from backend.models import User, Tribe


class TribesRes(Resource):
    """Tribes collection resource."""

    @roles_allowed(['admin', 'editor'])
    def post(self):
        """Create a new tribe.
        Creates a new tribe with given name.
        Roles allowed: admin, editor.
        ---
        tags:
          - tribes
        security:
          - bearerAuth: []
        consumes:
          - application/json
        parameters:
          - in: body
            name: tribe
            required: true
            description: Tribe object.
            schema:
              $ref: '#/definitions/Tribe'
        responses:
          201:
            description: Success.
            headers:
              Location:
                description: URI of the created tribe.
                type: string
          400:
            description: No tribe name given.
        """

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
        """Get all tribes.
        Returns all tribes to which requested user has rights to.
        Roles allowed: admin, editor.
        ---
        tags:
          - tribes
        security:
          - bearerAuth: []
        responses:
          200:
            description: Success.
        """

        tribes = Tribe.query.order_by(Tribe.name).all()

        if current_user.is_admin() is False:
            tribes = [t for t in tribes if current_user.id in t.editors_ids()]

        response = jsonify([t.serialize() for t in tribes])
        response.status_code = 200
        return response


class TribeRes(Resource):
    """Single tribe identified by id."""

    @roles_allowed(['admin', 'editor'])
    def put(self, tribe_id):
        """Update tribe.
        Updates tribes with given id.
        Roles allowed: admin, editor.
        ---
        tags:
          - tribes
        security:
          - bearerAuth: []
        consumes:
          - application/json
        parameters:
          - in: body
            name: tribe
            required: true
            description: Tribe object.
            schema:
              $ref: '#/definitions/Tribe'
        responses:
          200:
            description: Success.
          403:
            description: Forbidden. Requesting user doesn't have rights to this\
              tribe.
        """

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

        response = jsonify(tribe.serialize())
        response.status_code = 200
        return response

    @roles_allowed(['admin', 'editor'])
    def get(self, tribe_id):
        """Get tribe info.
        Returns full info of a tribe.
        Roles allowed: admin, editor.
        ---
        tags:
          - tribes
        security:
          - bearerAuth: []
        parameters:
          - in: path
            name: tribe_id
            required: true
            description: Id of the tribe.
            schema:
              type: integer
        responses:
          200:
            description: Success.
          404:
            description: Tribe with requested id doesn't exist.
        """

        tribe = Tribe.get_if_exists(tribe_id)

        response = jsonify(tribe.serialize(verbose=True))
        response.status_code = 200
        return response

    @roles_allowed(['admin', 'editor'])
    def delete(self, tribe_id):
        """Delete tribe.
        Roles allowed: admin, editor.
        ---
        tags:
          - tribes
        security:
          - bearerAuth: []
        parameters:
          - in: path
            name: tribe_id
            required: true
            description: Id of the tribe.
            schema:
              type: integer
        responses:
          204:
            description: Success.
          403:
            description: Forbidden. Requesting user doesn't have rights to this\
              tribe.
          404:
            description: Tribe with requested id doesn't exist.
        """

        Tribe.validate_access(tribe_id, current_user)
        tribe = Tribe.get_if_exists(tribe_id)

        try:
            db.session.delete(tribe)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = Response()
        response.status_code = 204
        return response


class TribeEditorsRes(Resource):
    """Collection of all editors of a tribe."""

    @roles_allowed(['admin', 'editor'])
    def get(self, tribe_id):
        """Get all editors of a tribe.
        Roles allowed: admin, editor.
        ---
        tags:
          - tribes
        security:
          - bearerAuth: []
        parameters:
          - in: path
            name: tribe_id
            required: true
            description: Id of the tribe.
            schema:
              type: integer
        responses:
          200:
            description: Success. Returns list of editors.
          403:
            description: Forbidden. Requesting user doesn't have rights to this\
              tribe.
          404:
            description: Tribe with requested id doesn't exist.
        """

        Tribe.validate_access(tribe_id, current_user)
        tribe = Tribe.get_if_exists(tribe_id)

        editors = [e.serialize() for e in tribe.editors]

        response = jsonify(editors)
        response.status_code = 200
        return response


class TribeEditorRes(Resource):
    """Editors of specific tribe."""

    @roles_allowed(['admin'])
    def put(self, tribe_id, user_id):
        """Add an editor to the tribe.
        Roles allowed: admin.
        ---
        tags:
          - tribes
        security:
          - bearerAuth: []
        parameters:
          - in: path
            name: tribe_id
            required: true
            description: Id of the tribe.
            schema:
              type: integer
          - in: path
            name: user_id
            required: true
            description: Id of the user.
            schema:
              type: integer
        responses:
          200:
            description: Success.
          403:
            description: Forbidden. Requesting user doesn't have rights to this\
              tribe.
          404:
            description: Tribe with requested id doesn't exist.
        """

        Tribe.validate_access(tribe_id, current_user)
        tribe = Tribe.get_if_exists(tribe_id)

        user = User.from_id(user_id)

        if user is None or (user.is_editor() is False):
            abort(404, 'Could not find editor with given id.')

        if user in tribe.editors:
            response = Response()
            response.status_code = 204
            return response

        tribe.editors.append(user)

        db.session.add(tribe)
        db.session.commit()

        response = Response()
        response.status_code = 201
        return response

    @roles_allowed(['admin'])
    def delete(self, tribe_id, user_id):
        """Remove editor from the tribe.
        Roles allowed: admin.
        ---
        tags:
          - tribes
        security:
          - bearerAuth: []
        parameters:
          - in: path
            name: tribe_id
            required: true
            description: Id of the tribe.
            schema:
              type: integer
          - in: path
            name: user_id
            required: true
            description: Id of the user.
            schema:
              type: integer
        responses:
          204:
            description: Success.
          403:
            description: Forbidden. Requesting user doesn't have rights to this\
              tribe.
          404:
            description: Tribe with requested id doesn't exist.
        """

        Tribe.validate_access(tribe_id, current_user)
        tribe = Tribe.get_if_exists(tribe_id)

        user = User.from_id(user_id)

        if user not in tribe.editors:
            abort(404, 'Could not find editor with given id.')

        tribe.editors.remove(user)

        db.session.add(tribe)
        db.session.commit()

        response = Response()
        response.status_code = 204
        return response
