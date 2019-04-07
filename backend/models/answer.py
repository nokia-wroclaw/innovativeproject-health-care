from backend.app import db


class Answer(db.Model):

    __tablename__ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    date = db.Column(db.Date)
    answer = db.Column(db.Integer)
    comment = db.Column(db.Text)

    question = db.relationship('Question', lazy='joined')

    def __init__(self, question_id, date, answer, comment):
        self.question_id = question_id
        self.date = date
        self.answer = answer
        self.comment = comment

    def serialize(self):
        data = {
            'id': self.id,
            'question_id': self.question_id,
            'date': self.date,
            'answer': self.answer,
            'comment': self.comment,
        }
        return data
