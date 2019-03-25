from backend import db


class Question(db.Model):

    _tablename_ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String)
    draft = db.Column(db.Boolean)

    surveys = db.relationship('SurveyQuestionLink', back_populates='question',
                              lazy='select')
