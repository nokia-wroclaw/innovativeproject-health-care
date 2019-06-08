from backend.app import db


class TeamUserLink(db.Model):
    """Object linking teams and users. Link consists of team id, user id and
    additional manager flag to specify what role user acts as in team.
    """

    __tablename__ = 'team_users'

    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'),
                        primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        primary_key=True)
    manager = db.Column(db.Boolean, primary_key=True)
    team = db.relationship('Team', back_populates='users', lazy='joined')
    user = db.relationship('User', back_populates='teams', lazy='joined')


class SurveyQuestionLink(db.Model):
    """Object linking surveys and questions. Link consists of survey id,
    question id and order field. This field specifies order in which
    questions are places within a survey.
    """

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
