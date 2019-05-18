from flask import request, abort, jsonify
from flask_jwt_extended import current_user
from flask_restful import Resource
from backend.common.data_manip import trend_matrix
from backend.common.permissions import roles_allowed
from backend.models import Team, Survey, Period, Tribe


class ResultsRes(Resource):
    """Collection of all results of all surveys."""

    @roles_allowed(['manager', 'user'])
    def get(self):
        """Returns results filtered and formatted according to passed
        query params."""

        if 'type' not in request.args:
            abort(400)

        args = request.args
        req_type = args['type']
        period = args['period'] if 'period' in args else None

        if req_type == 'team':
            if 'teamid' not in args:
                abort(400)
            return team_results(args['teamid'], period)

        elif req_type == 'tribematrix':
            if 'tribeid' not in args:
                abort(400)
            return tribematrix_results(args['tribeid'], period)

        else:
            abort(400)


def team_results(team_id, period_id=None):
    team = Team.get_if_exists(team_id)

    # Restrict access to team's managers and members
    if int(team_id) not in [l.team_id for l in current_user.teams]:
        abort(403)

    if period_id is not None:
        period = Period.get_if_exists(period_id)
    else:
        period = team.tribe.current_period()

    if period is None:
        abort(404)

    answers = team.get_answers(period)

    response = jsonify(answers)
    response.status_code = 200
    return response


def tribematrix_results(tribe_id, period_id):
    tribe = Tribe.get_if_exists(tribe_id)

    if not Survey.validate_access(tribe_id, current_user):
        abort(403)

    if period_id is not None:
        period = Period.get_if_exists(period_id)
    else:
        period = tribe.current_period()

    if period is None:
        abort(404)

    previous_period = Period.query.filter(
            Period.tribe_id == tribe_id,
            Period.date_start < period.date_start
        ).order_by(Period.date_start.desc()).first()

    new_results = tribe.get_answers(period)
    if previous_period is not None:
        old_results = tribe.get_answers(previous_period)
    else:
        old_results = None

    trends = trend_matrix(new_results, old_results)
    new_results['trends'] = trends

    response = jsonify(new_results)
    response.status_code = 200
    return response
