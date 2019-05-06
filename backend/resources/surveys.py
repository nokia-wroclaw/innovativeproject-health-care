from datetime import datetime
from flask import abort, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import current_user
from sqlalchemy import exc
from backend.common.permissions import roles_allowed
from backend.app import db
from backend.models import Tribe, Survey, Question, SurveyQuestionLink, Answer


class TribeSurveysRes(Resource):
    """Collection of all surveys of the given tribe."""

    @roles_allowed(['admin', 'editor'])
    def post(self, tribe_id):
        """Handles new survey. The survey can be drafted or published and
        created or updated."""

        Tribe.validate_access(tribe_id, current_user)

        # Abort if there is no required data in request
        json = request.get_json()
        if 'questions' not in json:
            abort(400, 'Invalid survey data.')
        questions = json['questions']

        # Fetch current draft survey if there is one
        draft = Survey.query.filter_by(tribe_id=tribe_id, draft=True) \
            .one_or_none()

        # Create new draft if there is no existing one
        created_f = False
        if draft is None:
            # Set 'created' flag
            created_f = True
            draft = Survey(tribe_id, datetime.now(), True)
            db.session.add(draft)

        # Delete all the survey-question links
        draft.questions.clear()
        db.session.flush()
        # TODO: Remove orphaned questions from db

        # Process questions
        for q in questions:
            if 'id' in q:
                # If question has id try to find it in db
                question = Question.get_if_exists(q['id'])
            elif 'question' in q:
                # If question does have its content then create it
                question = Question(q['question'])
                db.session.add(question)
                db.session.flush()
            else:
                # Abort if there is no id or content
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


class SurveyRes(Resource):
    """Single survey identified by id."""

    @roles_allowed(['admin', 'editor', 'manager', 'user'])
    def get(self, survey_id):
        """Returns survey with specified id."""

        survey = Survey.get_if_exists(survey_id)

        # Check if any of the current user's roles allows him to access
        # this survey
        access = False
        if current_user.is_user():
            tribe_ids = [t.team.tribe_id for t in current_user.teams
                         if t.manager is False]
            if survey.tribe_id in tribe_ids:
                access = True
        if current_user.is_manager() and not access:
            tribe_ids = [t.team.tribe_id for t in current_user.teams
                         if t.manager is True]
            if survey.tribe_id in tribe_ids:
                access = True
        if current_user.is_editor() and not access:
            if survey.tribe_id in current_user.editing_ids():
                access = True
        if current_user.is_admin() and not access:
            access = True

        if not access:
            abort(403)

        response = jsonify(survey.serialize())
        response.status_code = 200
        return response


class SurveyAnswersRes(Resource):
    """Survey answer"""

    @roles_allowed(['user'])
    def post(self, survey_id):
        """Save survey answers"""

        survey = Survey.query.filter_by(id=survey_id, draft=False).one_or_none()

        # There is nor survey or it is not published yet
        if survey is None:
            abort(404, 'Requested survey does not exist.')

        # User have to be in team which is in tribe which has that survey to send answers
        access = False
        if current_user.is_user():
            tribe_ids = [t.team.tribe_id for t in current_user.teams
                         if t.manager if False]
            if survey.tribe_id in tribe_ids:
                access = True

        if access is False:
            abort(403)

        # Answers data
        answers = request.get_json()
        # Answers ids
        answers_ids = [a['question_id'] for a in answers]
        # Questions data
        questions = survey.serialize_questions()
        # Questions ids
        questions_ids = [q['id'] for q in questions]

        # Check if there are questions for all answers
        # and if there are answers for all questions
        # and if all necessary comments was put
        for a in answers:
                # Answers for all questions
                if a['question_id'] not in questions_ids:
                    abort(400, 'Invalid answer data.')
                # Comment section
                if 'comment' not in a:
                    abort(400, 'Invalid answer data.')
                # Necessary comments
                if int(a['answer']) < 2 and len(a['comment'] == 0):
                    abort(400, 'Invalid answer data.')

        # Questions for all answers
        for q in questions_ids:
            if q not in answers_ids:
                abort(400, 'Invalid answer data.')

        # All fine
        # Answer objects list
        answer_ojb = []
        now = datetime.now()
        for a in answers:
            answer = Answer(a['question_id'], now, a['answer'], a['comment'])
            db.session.add(answer)
            answer_ojb.append(answer)
        db.session.commit()

        answer_json = []
        for a in answer_ojb:
            answer_json.append(a.serialize())

        response = jsonify(answer_json)
        response.headers['Location'] = '/surveys/%d/answers' % survey_id
        response.status_code = 201

        return response
