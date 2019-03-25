from backend import db


class Survey(db.Model):

    _tablename_ = 'surveys'

    id = db.Column(db.Integer, primary_key=True)
    tribe_id = db.Column(db.Integer, db.ForeignKey('tribes.id'))
    date = db.Column(db.Date)
    draft = db.Column(db.Boolean)
    period = db.Column(db.Interval)

    tribe = db.relationship('Tribe', back_populates='surveys', lazy='joined')
    questions = db.relationship('SurveyQuestionLink', back_populates='survey',
                                lazy='joined')
