from datetime import datetime
from flask import Response, abort, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import current_user
from sqlalchemy import exc
from backend.common.permissions import roles_allowed
from backend.app import db
from backend.models import Tribe, Survey, Question, SurveyQuestionLink


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
            response.headers['Location'] = '/tribes/%d/surveys/%d'\
                                           % (tribe_id, draft.id)
        else:
            response.status_code = 200
        return response
