from backend.app import db


class Action(db.Model):

    __tablename__ = 'actions'

    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    answer_id = db.Column(db.Integer, db.ForeignKey('answers.id', ondelete='CASCADE', onupdate='CASCADE'))
    date = db.Column(db.Date)
    message = db.Column(db.Text)
    is_completed = db.Column(db.Boolean)
    url = db.Column(db.Text)

    team = db.relationship('Team', back_populates='actions', lazy='joined')
    user = db.relationship('User', back_populates='actions', lazy='joined')
    answer = db.relationship('Answer', back_populates='actions', lazy='joined')

    def __init__(self, team_id, date, message, is_completed, url, answer_id, user_id=None):
        self.team_id = team_id
        self.user_id = user_id
        self.date = date
        self.message = message
        self.is_completed = is_completed
        self.url = url
        self.answer_id = answer_id

    def serialize(self):
        """Serializes action object.

        :return: Serialized action.
        :rtype: dict
        """
        data = {
            'id': self.id,
            'team_id': self.team_id,
            'user_id': self.user_id,
            'date': self.date,
            'message': self.message,
            'is_completed': self.is_completed,
            'url': self.url,
            'username': self.user.full_name
        }
        return data

    @staticmethod
    def from_request(json, answer_id, is_completed=False):
        action = Action(json['team_id'], json['date'], json['message'], is_completed, json['url'], answer_id)
        return action
