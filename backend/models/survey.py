from flask import abort
from backend.app import db


class Survey(db.Model):

    __tablename__ = 'surveys'

    id = db.Column(db.Integer, primary_key=True)
    tribe_id = db.Column(db.Integer, db.ForeignKey('tribes.id'))
    date = db.Column(db.Date)
    draft = db.Column(db.Boolean)

    tribe = db.relationship('Tribe', back_populates='surveys', lazy='joined')
    questions = db.relationship('SurveyQuestionLink',
                                back_populates='survey',
                                lazy='joined',
                                cascade='all, delete, delete-orphan')

    def __init__(self, tribe_id, date, draft):
        self.tribe_id = tribe_id
        self.date = date
        self.draft = draft

    @staticmethod
    def get_if_exists(survey_id):
        """Fetches survey with given id if it exists, aborts with
        404 status otherwise.
        """

        survey = Survey.query.filter_by(id=survey_id).one_or_none()
        if survey is None:
            abort(404, 'Requested survey does not exist.')
        return survey

    def serialize_questions(self):
        questions = []
        for l in self.questions:
            question = l.question.serialize()
            question['order'] = l.order
            questions.append(question)
        return questions

    def serialize(self):
        data = {
            'id': self.id,
            'tribe_id': self.tribe_id,
            'date': self.date,
            'draft': self.draft,
            'questions': self.serialize_questions()
        }
        return data
