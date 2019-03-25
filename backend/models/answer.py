from backend import db


class Answer(db.Model):

    _tablename_ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    date = db.Column(db.Date)
    answer = db.Column(db.Integer)
    comment = db.Column(db.Text)

    question = db.relationship('Question', lazy='joined')
