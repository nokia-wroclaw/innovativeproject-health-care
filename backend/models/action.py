from backend import db


class Action(db.Model):

    _tablename_ = 'actions'

    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    date = db.Column(db.Date)
    message = db.Column(db.Text)
    status = db.Column(db.Boolean)

    team = db.relationship('Team', back_populates='actions', lazy='joined')
    user = db.relationship('User', back_populates='actions', lazy='joined')
