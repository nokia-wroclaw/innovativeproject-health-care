from flask import request, abort, jsonify
from flask_jwt_extended import current_user
from flask_restful import Resource
from backend.common.data_manip import trend_matrix
from backend.common.permissions import roles_allowed
from backend.models import Team, Survey, Period, Tribe


class ResultsRes(Resource):
    """Collection of all results of all surveys."""

    @roles_allowed(['editor', 'manager', 'user'])
    def get(self):
        """Get tribe's results.
        Roles allowed: editor, manager, user.
        ---
        tags:
          - results
        security:
          - bearerAuth: []
        parameters:
          - in: query
            name: type
            required: true
            description: "Type of the results. Possible values are: team,\
              tribematrix, tribehistory."
            schema:
              type: string
              enum: [team, tribematrix, tribehistory]
          - in: query
            name: teamId
            description: Id of the team. Required with 'team' type.
            schema:
              type: integer
          - in: query
            name: tribeId
            description: Id of the tribe. Required with 'tribematrix' and\
               'tribehistory' types.
            schema:
              type: integer
          - in: query
            name: period
            required: false
            description: Id of the period. Used with 'team' type.
            schema:
              type: integer
          - in: query
            name: periods
            required: false
            description: Number of periods. Used with 'tribehistory'.
            schema:
              type: integer
        responses:
          200:
            description: Success. Returns results.
          404:
            description: Tribe with requested id doesn't exist.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this tribe.
          400:
            description: Invalid parameters.
        """

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

        elif req_type == 'tribehistory':
            if 'tribeid' not in args or 'periods' not in args:
                abort(400)
            return tribehistory_results(args['tribeid'], int(args['periods']))

        else:
            abort(400)


@roles_allowed(['manager', 'user'])
def team_results(team_id, period_id=None):
    team = Team.get_if_exists(team_id)

    if not Survey.validate_access(team.tribe_id, current_user):
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


@roles_allowed(['editor', 'manager', 'user'])
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

    previous_period = period.previous()

    new_results = tribe.get_answers(period)

    if new_results is None:
        abort(404)

    old_results = tribe.get_answers(previous_period)\
        if previous_period is not None else None

    trends = trend_matrix(new_results, old_results)
    new_results['trends'] = trends

    response = jsonify(new_results)
    response.status_code = 200
    return response


@roles_allowed(['editor', 'manager', 'user'])
def tribehistory_results(tribe_id, periods):
    tribe = Tribe.get_if_exists(tribe_id)

    if not Survey.validate_access(tribe_id, current_user):
        abort(403)

    periods_list = []
    period = tribe.current_period()
    for i in range(periods):
        if period is None:
            break
        periods_list.append(period)
        period = period.previous()

    # Reverse periods to start from the oldest one
    periods_list.reverse()

    # Create matrix with teams in rows and periods in columns
    teams = []
    teams_map = {}
    matrix = []
    for i, period in enumerate(periods_list):
        results = tribe.get_averages(period)
        for j, team in enumerate(results['teams']):
            # Add row and mapping for each new encountered team
            if team['id'] not in teams_map:
                teams_map[team['id']] = len(matrix)
                matrix.append([None] * len(periods_list))
                teams.append(team)

            matrix[teams_map[team['id']]][i] = results['averages'][j]

    results = {
        'teams': teams,
        'periods': [p.serialize() for p in periods_list],
        'matrix': matrix
    }

    response = jsonify(results)
    response.status_code = 200
    return response
