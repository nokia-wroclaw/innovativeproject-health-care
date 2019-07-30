from datetime import date

from dateutil.relativedelta import relativedelta
from flask import abort, Response, jsonify, request
from flask_jwt_extended import current_user
from flask_restful import Resource
from sqlalchemy import exc

from backend.app import db
from backend.common.permissions import roles_allowed
from backend.models import Tribe, Survey, Question, SurveyQuestionLink, Answer, \
    Period, Team


class TribeSurveysRes(Resource):
    """Collection of all surveys of the given tribe."""

    @roles_allowed(['editor'])
    def post(self, tribe_id):
        """Save survey draft.
        If specified tribe has no survey this endpoint will create it.\
        If survey for a tribe already exists it will be overwritten.
        Roles allowed: editor.
        ---
        tags:
          - surveys
        security:
          - bearerAuth: []
        consumes:
          - application/json
        parameters:
          - in: path
            name: tribe_id
            required: true
            description: Id of the tribe.
            schema:
              type: integer
          - in: body
            name: survey
            required: true
            description: Survey object.
            schema:
              $ref: '#/definitions/Survey'
        responses:
          201:
            description: Success.
            headers:
              Location:
                description: URI of the created survey.
                type: string
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this tribe.
          400:
            description: No survey data or invalid data.
        """

        Tribe.validate_access(tribe_id, current_user)

        # Abort if there is no required data in request
        json = request.get_json()
        if 'questions' not in json or 'period_len' not in json:
            abort(400, 'Invalid survey data.')
        questions = json['questions']
        period_len = json['period_len']

        # Fetch current draft survey if there is one
        draft = (
            Survey.query
            .filter_by(tribe_id=tribe_id, draft=True)
            .one_or_none()
        )

        # Create new draft if there is no existing one
        created_f = False
        if draft is None:
            # Set 'created' flag
            created_f = True
            draft = Survey(tribe_id, True)
            db.session.add(draft)

        # Set survey period length
        draft.period_len = period_len
        # Delete all the survey-question links
        draft.questions.clear()
        db.session.flush()
        # TODO: Remove orphaned questions from db

        # Process questions
        for q in questions:
            if all([prop in q for prop in ['id', 'value', 'order']]):
                if len(q.get('value', '')) != 0:
                    # If id, subject and content are given update the existing question
                    question = Question.get_if_exists(q['id'])
                    question.subject = q['subject']
                    question.question = q['value']
                    db.session.add(question)
                    db.session.flush()
                else:
                    # If question has only its content and subject then create it
                    question = Question(q['subject'], q['value'])
                    db.session.add(question)
                    db.session.flush()
            elif 'id' in q and 'order' in q:
                # If question has only id try to find it in db
                question = Question.get_if_exists(q['id'])
            else:
                # Abort if there is no id or content
                db.session.rollback()
                abort(400, 'Invalid question data.')
                return

            # Create link between draft and question
            question_link = SurveyQuestionLink(survey_id=draft.id,
                                               question_id=question.id,
                                               order=q['order'])

            # Add link to the draft
            draft.questions.append(question_link)

        try:
            db.session.add(draft)
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = jsonify(draft.serialize())
        if created_f is True:
            response.status_code = 201
            response.headers['Location'] = '/surveys/%d' % draft.id
        else:
            response.status_code = 200
        return response

    @roles_allowed(['editor', 'manager', 'user'])
    def get(self, tribe_id):
        """Get surveys of a tribe.
        Returns all three types of surveys a tribe can have: active: pending\
        and draft. It's possible to fetch ony one of these using 'type'\
        parameter.
        Roles allowed: editor, manager, user.
        ---
        tags:
          - surveys
        security:
          - bearerAuth: []
        parameters:
          - in: path
            name: tribe_id
            required: true
            description: Id of the tribe.
            schema:
              type: integer
          - in: query
            name: type
            required: false
            description: Type of the survey.
            schema:
              type: string
              enum: [active, next, draft]
        responses:
          200:
            description: Success. Returns list of surveys.
          400:
            description: Invalid parameter.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this tribe.
          404:
            description: Tribe with requested id doesn't exist.
        """

        tribe = Tribe.get_if_exists(tribe_id)

        if not Survey.validate_access(tribe_id, current_user):
            abort(403)

        req_type = request.args['type'] if 'type' in request.args else None
        if req_type and req_type not in ['active', 'next', 'draft']:
            abort(400)

        surveys = {}

        # If no type is specified return all surveys, otherwise
        # just the requested one
        if not req_type or req_type == 'active':
            survey = tribe.active_survey()
            if survey is not None:
                surveys['active'] = survey.serialize()
        if not req_type or req_type == 'next':
            survey = tribe.next_survey()
            if survey is not None:
                surveys['next'] = survey.serialize()
        if not req_type or req_type == 'draft':
            survey = tribe.draft_survey()
            if survey is not None:
                surveys['draft'] = survey.serialize()

        response = jsonify(surveys)
        response.status_code = 200
        return response


class SurveyRes(Resource):
    """Single survey identified by id."""

    @roles_allowed(['editor', 'manager', 'user'])
    def get(self, survey_id):
        """Get specific survey.
        Roles allowed: editor, manager, user.
        ---
        tags:
          - surveys
        security:
          - bearerAuth: []
        parameters:
          - in: path
            name: survey_id
            required: true
            description: Id of the survey.
            schema:
              type: integer
        responses:
          200:
            description: Success. Returns survey object.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this tribe.
          404:
            description: Survey with requested id doesn't exist.
        """

        survey = Survey.get_if_exists(survey_id)

        if not Survey.validate_access(survey.tribe_id, current_user):
            abort(403)

        response = jsonify(survey.serialize())
        response.status_code = 200
        return response

    @roles_allowed(['editor'])
    def patch(self, survey_id):
        """Publish a draft.
        Roles allowed: editor.
        ---
        tags:
          - surveys
        security:
          - bearerAuth: []
        consumes:
          - application/json
        parameters:
          - in: path
            name: survey_id
            required: true
            description: Id of the survey.
            schema:
              type: integer
          - in: body
            required: true
            name: draftPatch
            description: Draft will be published when 'draft' is set to false.
            schema:
              $ref: '#/definitions/DraftPatch'
        responses:
          200:
            description: Success. Returns survey object.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this tribe.
          400:
            description: No survey data or invalid data.
          404:
            description: Survey with requested id doesn't exist.
        """

        survey = Survey.get_if_exists(survey_id)

        if not Survey.validate_access(survey.tribe_id, current_user):
            abort(403)

        json = request.get_json()
        if 'draft' not in json or json['draft'] is not False:
            abort(400, 'Invalid survey data.')

        # If survey is not a draft do not do anything
        if survey.draft is False:
            response = Response()
            response.status_code = 204
            return response

        # Updates periods definitions in periods table
        survey.tribe.update_periods()

        active = survey.tribe.active_survey()
        next = survey.tribe.next_survey()

        if active is None:
            # If there is no active survey
            # This will be the first published survey
            period = Period(survey.tribe_id, date.today().replace(day=1))
            survey.date = period.date_start
            survey.draft = False
            db.session.add(period)
        elif next is None:
            # If there is an active survey but there is no next one
            period = survey.tribe.current_period()
            next_period_date = period.date_start + \
                               relativedelta(months=+active.period_len)
            next_period = Period(survey.tribe_id, next_period_date)
            survey.date = next_period_date
            survey.draft = False
            db.session.add(next_period)
        else:
            # If there is an active and next published survey
            survey.date = next.date
            survey.draft = False
            db.session.delete(next)

        # Create new draft by copying the published draft
        new_draft = Survey(survey.tribe_id, True)
        new_draft.period_len = survey.period_len
        db.session.add(new_draft)
        db.session.flush()
        for q in survey.questions:
            new_link = SurveyQuestionLink(survey_id=new_draft.id,
                                          question_id=q.question_id,
                                          order=q.order)
            new_draft.questions.append(new_link)

        db.session.add(survey)
        db.session.add(new_draft)
        db.session.commit()
        response = jsonify(survey.serialize())
        response.status_code = 200
        return response

    @roles_allowed(['editor'])
    def delete(self, survey_id):
        """Delete survey.
        Only pending surveys are possible to delete.
        Roles allowed: editor.
        ---
        tags:
          - surveys
        security:
          - bearerAuth: []
        parameters:
          - in: path
            name: survey_id
            required: true
            description: Id of the survey.
            schema:
              type: integer
        responses:
          204:
            description: Success.
          400:
            description: Survey exists but isn't a draft and therefore it\
              can't be deleted.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this survey.
          404:
            description: Survey with requested id doesn't exist.
        """

        survey = Survey.get_if_exists(survey_id)

        if not Survey.validate_access(survey.tribe_id, current_user):
            abort(403)

        # If requested survey is not next survey for the tribe
        if (survey.draft is True or survey.date is None or
                survey.date <= date.today()):
            abort(400)

        # Delete the survey
        db.session.delete(survey)

        # Get current draft and update its questions to the current newest
        # survey (the active one)
        tribe = Tribe.query.filter_by(id=survey.tribe_id).one()
        active = tribe.active_survey()
        draft = tribe.draft_survey()
        draft.questions.clear()
        for q in active.questions:
            new_link = SurveyQuestionLink(survey_id=draft.id,
                                          question_id=q.question_id,
                                          order=q.order)
            draft.questions.append(new_link)

        db.session.add(draft)
        db.session.commit()
        response = Response()
        response.status_code = 204
        return response


class SurveyAnswersRes(Resource):
    """Collection of the answers to the specific survey."""

    @roles_allowed(['user'])
    def post(self, survey_id):
        """Send answer to the survey.
        Roles allowed: user.
        ---
        tags:
          - surveys
        security:
          - bearerAuth: []
        consumes:
          - application/json
        parameters:
          - in: path
            name: survey_id
            required: true
            description: Id of the survey.
            schema:
              type: integer
          - in: body
            name: answer
            required: true
            description: Survey answer object.
            schema:
              $ref: '#/definitions/SurveyAnswer'
        responses:
          200:
            description: Success. Returns answer object.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this survey.
          404:
            description: Survey with requested id doesn't exists.
          400:
            description: No answer data or invalid data.
        """

        survey = Survey.query.filter_by(id=survey_id).one_or_none()

        # If survey if given id does not exist or is not published
        if (survey is None or survey.draft is True or
                survey.date > date.today()):
            abort(404, 'Requested survey does not exist.')

        # Check if all required data are sent
        json = request.get_json()
        if 'team_id' not in json or 'answers' not in json:
            abort(400, 'Invalid answer data')

        answers = json['answers']
        team = Team.get_if_exists(json['team_id'])

        # Check if user is a member of the declared team and
        # if the team is in the same tribe as the survey
        if (team.id not in current_user.team_ids() or
                team.tribe_id != survey.tribe_id):
            abort(403)

        # Check if there is no answers for this team in this period
        if team.answered():
            abort(400, 'Only one answer per team is allowed.')

        # Validate the answers
        for a in answers:
            if 'question_id' not in a or 'answer' not in a:
                db.session.rollback()
                abort(400, 'Invalid answer data')

            if (0 <= int(a['answer']) <= 2) is False:
                db.session.rollback()
                abort(400, 'Invalid answer data')

            if (int(a['answer']) != 2
                    and ('comment' not in a or len(a['comment']) == 0)):
                db.session.rollback()
                abort(400, 'Invalid answer data')

        # Answers ids
        answers_ids = [a['question_id'] for a in answers]
        # Questions ids
        questions_ids = [q.question.id for q in survey.questions]

        # Check if answer contains exactly the same questions set as survey
        if set(answers_ids) != set(questions_ids):
            abort(400, 'Invalid answer data.')

        # Answer objects list
        answer_obj = []
        today = date.today()
        # For all answers
        for a in answers:
            answer = Answer(a['question_id'], team.id, today, a['answer'])
            if 'comment' in a and len(a['comment']) != 0:
                answer.comment = a['comment']
            db.session.add(answer)
            answer_obj.append(answer)

        try:
            db.session.commit()
        except exc.SQLAlchemyError:
            abort(400)

        response = jsonify([a.serialize() for a in answer_obj])
        response.status_code = 200
        return response


class TribePeriodsRes(Resource):
    """Collection of periods of tribe with specified id."""

    @roles_allowed(['editor', 'manager', 'user'])
    def get(self, tribe_id):
        """Get periods of the tribe.
        Roles allowed: manager, user.
        ---
        tags:
          - surveys
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
            description: Success. Returns list of periods.
          403:
            description: Forbidden. Requesting user doesn't have rights to\
              this tribe.
          404:
            description: Tribe with requested id doesn't exist.
        """

        Tribe.get_if_exists(tribe_id)

        if not Survey.validate_access(tribe_id, current_user):
            abort(403)

        periods = (
            Period.query
            .filter(
                Period.tribe_id == tribe_id,
                Period.date_start <= date.today()
            )
            .order_by(Period.date_start.desc())
            .all()
        )

        response = jsonify([p.serialize() for p in periods])
        response.status_code = 200
        return response
