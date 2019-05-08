from datetime import date
from dateutil.relativedelta import relativedelta
from flask import abort, Response, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import current_user
from sqlalchemy import exc
from backend.common.permissions import roles_allowed
from backend.app import db
from backend.models import Tribe, Survey, Question, SurveyQuestionLink, Answer, \
    Period, Team


class TribeSurveysRes(Resource):
    """Collection of all surveys of the given tribe."""

    @roles_allowed(['editor'])
    def post(self, tribe_id):
        """Handles new survey. The survey can be drafted or published and
        created or updated."""

        Tribe.validate_access(tribe_id, current_user)

        # Abort if there is no required data in request
        json = request.get_json()
        if 'questions' not in json or 'period_len' not in json:
            abort(400, 'Invalid survey data.')
        questions = json['questions']
        period_len = json['period_len']

        # Fetch current draft survey if there is one
        draft = Survey.query.filter_by(tribe_id=tribe_id, draft=True) \
            .one_or_none()

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
            if 'id' in q and 'question' in q and 'order' in q:
                # If both id and content are given update the existing question
                question = Question.get_if_exists(q['id'])
                question.question = q['question']
                db.session.add(question)
                db.session.flush()
            elif 'id' in q and 'order' in q:
                # If question has only id try to find it in db
                question = Question.get_if_exists(q['id'])
            elif 'question' in q and 'order' in q:
                # If question has only its content then create it
                question = Question(q['question'])
                db.session.add(question)
                db.session.flush()
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
        """Returns ids of three possible types of surveys a tribe can have:
        active, next and draft."""

        tribe = Tribe.get_if_exists(tribe_id)
        active_survey = tribe.active_survey()
        next_survey = tribe.next_survey()
        draft_survey = tribe.draft_survey()

        # If user has rights to access the active survey he also has rights
        # to this endpoint
        if not Survey.validate_access(active_survey.id, current_user):
            abort(403)

        return {
            "active": active_survey.id if active_survey else None,
            "next": next_survey.id if next_survey else None,
            "draft": draft_survey.id if draft_survey else None,
        }


class SurveyRes(Resource):
    """Single survey identified by id."""

    @roles_allowed(['editor', 'manager', 'user'])
    def get(self, survey_id):
        """Returns survey with specified id."""

        survey = Survey.get_if_exists(survey_id)

        if not Survey.validate_access(survey_id, current_user):
            abort(403)

        response = jsonify(survey.serialize())
        response.status_code = 200
        return response

    @roles_allowed(['editor'])
    def patch(self, survey_id):
        """Partially updates survey with specified id.
        Used to publish draft."""

        survey = Survey.get_if_exists(survey_id)

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

        db.session.add(survey)
        db.session.commit()
        response = jsonify(survey.serialize())
        response.status_code = 200
        return response


class SurveyAnswersRes(Resource):
    """Collection of the answers to the specific survey."""

    @roles_allowed(['user'])
    def post(self, survey_id):
        """Submits new answer to the survey with specific id."""

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
