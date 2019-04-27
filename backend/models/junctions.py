from backend.app import db


class TeamUserLink(db.Model):

    __tablename__ = 'team_users'

    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'),
                        primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        primary_key=True)
    manager = db.Column(db.Boolean, primary_key=True)
    team = db.relationship('Team', back_populates='users', lazy='joined')
    user = db.relationship('User', back_populates='teams', lazy='joined')


class SurveyQuestionLink(db.Model):

    __tablename__ = 'survey_questions'

    survey_id = db.Column(db.Integer,
                          db.ForeignKey('surveys.id'),
                          primary_key=True)
    question_id = db.Column(db.Integer,
                            db.ForeignKey('questions.id'),
                            primary_key=True)
    order = db.Column(db.Integer, nullable=False)
    survey = db.relationship('Survey', back_populates='questions',
                             lazy='joined')
    question = db.relationship('Question', back_populates='surveys',
                               lazy='joined')


editors = db.Table('editors',
                   db.Column('tribe_id',
                             db.Integer,
                             db.ForeignKey('tribes.id'),
                             primary_key=True),
                   db.Column('user_id',
                             db.Integer,
                             db.ForeignKey('users.id'),
                             primary_key=True)
                   )
