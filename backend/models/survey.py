from flask import abort
from backend.app import db


class Survey(db.Model):

    __tablename__ = 'surveys'

    id = db.Column(db.Integer, primary_key=True)
    tribe_id = db.Column(db.Integer, db.ForeignKey('tribes.id'))
    date = db.Column(db.Date, nullable=True)
    period_len = db.Column(db.Integer, default=1)
    draft = db.Column(db.Boolean)

    tribe = db.relationship('Tribe', back_populates='surveys', lazy='joined')
    questions = db.relationship('SurveyQuestionLink',
                                back_populates='survey',
                                lazy='joined',
                                cascade='all, delete, delete-orphan')

    def __init__(self, tribe_id, draft):
        self.tribe_id = tribe_id
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

    @staticmethod
    def validate_access(survey_id, user):
        """Checks if any of the given user's roles allows him to access
        survey with given id."""

        survey = Survey.query.filter_by(id=survey_id).one_or_none()
        if survey is None:
            return False

        access = False
        if user.is_user():
            tribe_ids = [t.team.tribe_id for t in user.teams
                         if t.manager is False]
            if survey.tribe_id in tribe_ids:
                access = True
        if user.is_manager() and not access:
            tribe_ids = [t.team.tribe_id for t in user.teams
                         if t.manager is True]
            if survey.tribe_id in tribe_ids:
                access = True
        if user.is_editor() and not access:
            if survey.tribe_id in user.editing_ids():
                access = True

        return access

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
            'date': self.date.isoformat() if self.date else None,
            'draft': self.draft,
            'period_len': self.period_len,
            'questions': self.serialize_questions()
        }
        return data
