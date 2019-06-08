from flask import abort
from backend.app import db


class Question(db.Model):

    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String)

    surveys = db.relationship('SurveyQuestionLink',
                              back_populates='question',
                              lazy='select',
                              cascade='all, delete, delete-orphan')

    def __init__(self, question):
        self.question = question

    @staticmethod
    def get_if_exists(question_id):
        """Fetches question with given id if it exists, aborts with
        404 status otherwise.

        :param int question_id: Id of the question.
        :return: Question with specified id.
        :rtype: Question
        """

        question = Question.query.filter_by(id=question_id).one_or_none()
        if question is None:
            abort(404, 'Could not find question with given id.')
        return question

    def serialize(self):
        """Serializes question object.

        :return: Serialized question.
        :rtype: dict
        """

        data = {
            'id': self.id,
            'value': self.question,
        }
        return data
