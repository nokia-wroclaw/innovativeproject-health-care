from backend.app import db


class Question(db.Model):

    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String)
    draft = db.Column(db.Boolean)

    surveys = db.relationship('SurveyQuestionLink', back_populates='question',
                              lazy='select')

    def __init__(self, question, draft):
        self.question = question
        self.draft = draft

    def serialize(self):
        data = {
            'id': self.id,
            'question': self.question,
            'draft': self.draft,
        }
        return data
