from backend.app import db


class Survey(db.Model):

    __tablename__ = 'surveys'

    id = db.Column(db.Integer, primary_key=True)
    tribe_id = db.Column(db.Integer, db.ForeignKey('tribes.id'))
    date = db.Column(db.Date)
    draft = db.Column(db.Boolean)
    period = db.Column(db.Interval)

    tribe = db.relationship('Tribe', back_populates='surveys', lazy='joined')
    questions = db.relationship('SurveyQuestionLink', back_populates='survey',
                                lazy='joined')

    def __init__(self, tribe_id, date, draft, period):
        self.tribe_id = tribe_id
        self.date = date
        self.draft = draft
        self.period = period

    def serialize(self):
        data = {
            'id': self.id,
            'tribe_id': self.tribe_id,
            'date': self.date,
            'draft': self.draft,
            'period': self.period,
        }
        return data
