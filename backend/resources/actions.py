from flask import jsonify, request, abort, Response
from flask_restful import Resource

from backend.common.permissions import roles_allowed
from backend.models import Action, User
from backend.app import db


class ActionsRes(Resource):

    @roles_allowed(['admin'])
    def get(self, answer_id):
        actions = Action.query.filter_by(answer_id=answer_id).all()
        response = jsonify([a.serialize() for a in actions])
        response.status_code = 200
        return response

    def post(self, answer_id):
        json = request.get_json()
        user = User.from_id(json.get('user_id'))
        if user is None:
            abort(404, 'Could not find user with given identity.')

        if not user.in_db():
            db.session.add(user)

        action_item = Action.from_request(json, answer_id)
        db.session.add(action_item)
        action_item.user = user
        db.session.commit()
        response = jsonify(action_item.serialize())
        response.status_code = 200
        return response


class ActionRes(Resource):

    @roles_allowed(['admin'])
    def delete(self, action_id):
        action = Action.query.get(action_id)
        db.session.delete(action)
        db.session.commit()
        response = Response()
        response.status_code = 200
        return response

