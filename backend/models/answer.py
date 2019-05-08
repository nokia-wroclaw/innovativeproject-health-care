from backend.app import db


class Answer(db.Model):

    __tablename__ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    date = db.Column(db.Date)
    answer = db.Column(db.Integer)
    comment = db.Column(db.Text, nullable=True)

    question = db.relationship('Question', lazy='joined')
    team = db.relationship('Team', lazy='select')

    def __init__(self, question_id, team_id, date, answer):
        self.question_id = question_id
        self.team_id = team_id
        self.date = date
        self.answer = answer

    def serialize(self):
        data = {
            'id': self.id,
            'question_id': self.question_id,
            'team_id': self.team_id,
            'date': self.date,
            'answer': self.answer,
            'comment': self.comment,
        }
        return data
