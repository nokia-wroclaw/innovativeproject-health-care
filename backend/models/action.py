from backend.app import db


class Action(db.Model):

    __tablename__ = 'actions'

    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    date = db.Column(db.Date)
    message = db.Column(db.Text)
    status = db.Column(db.Boolean)

    team = db.relationship('Team', back_populates='actions', lazy='joined')
    user = db.relationship('User', back_populates='actions', lazy='joined')

    def __init_(self, team_id, user_id, date, message, status):
        self.team_id = team_id
        self.user_id = user_id
        self.date = date
        self.message = message
        self.status = status
