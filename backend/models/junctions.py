from backend import db


class TeamUserLink(db.Model):

    _tablename_ = 'team_users'

    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'),
                        primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        primary_key=True)
    manager = db.Column(db.Boolean)
    team = db.relationship('Team', back_populates='teams', lazy='joined')
    user = db.relationship('User', back_populates='users', lazy='joined')


class SurveyQuestionLink(db.Model):

    _tablename_ = 'survey_questions'

    survey_id = db.Column(db.Integer, db.ForeignKey('surveys.id'),
                          primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'),
                            primmary_key=True)
    order = db.Column(db.Integer)
    survey = db.relationship('Survey', back_populates='surveys',
                             lazy='joined')
    question = db.relationship('Question', back_populates='questions',
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
