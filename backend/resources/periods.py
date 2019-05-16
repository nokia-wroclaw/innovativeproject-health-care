from datetime import date
from flask_restful import Resource
from flask import abort, jsonify
from flask_jwt_extended import current_user
from backend.common.permissions import roles_allowed
from backend.models import Tribe, Period, Survey


class TribePeriodsRes(Resource):
    """Collection of periods of tribe with specified id."""

    @roles_allowed(['manager', 'user'])
    def get(self, tribe_id):
        """Returns list of past and current periods for the specified tribe."""

        Tribe.get_if_exists(tribe_id)

        if not Survey.validate_access(tribe_id, current_user):
            abort(403)

        periods = Period.query.filter(Period.tribe_id == tribe_id,
                                      Period.date_start <= date.today())\
            .order_by(Period.date_start.desc()).all()

        response = jsonify([p.serialize() for p in periods])
        response.status_code = 200
        return response
