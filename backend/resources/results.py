from flask import request, abort, jsonify
from flask_jwt_extended import current_user
from flask_restful import Resource
from backend.common.permissions import roles_allowed
from backend.models import Team, Survey, Period


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

        if req_type == 'team':
            if 'teamid' not in args:
                abort(400)
            period = args['period'] if 'period' in args else None
            return self.team_results(args['teamid'], period)
        elif req_type == 'tribeMatrix':
            # TODO: Implement tribe matrix results
            pass
        else:
            abort(400)

    def team_results(self, team_id, period_id=None):
        team = Team.get_if_exists(team_id)

        if not Survey.validate_access(team.tribe_id, current_user):
            abort(403)

        if period_id is not None:
            period = Period.get_if_exists(period_id)
        else:
            period = team.tribe.current_period()

        if period is None:
            abort(404)

        answers = team.answers(period)

        if answers is None:
            response = jsonify([])
            response.status_code = 200
            return response

        results = []
        for a in answers:
            result = {
                'order': a.order,
                'question': a.question.question,
                'answer': a.answer,
                'comment': a.comment
            }
            results.append(result)

        response = jsonify(results)
        response.status_code = 200
        return response
