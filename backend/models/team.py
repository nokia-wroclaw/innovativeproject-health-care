from backend import db


class Team(db.Model):

    _tablename_ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    tribe_id = db.Column(db.Integer, db.ForeignKey('tribes.id'))
    name = db.Column(db.String(64))

    tribe = db.relationship('Tribe', back_populates='teams', lazy='joined')
    actions = db.relationship('Action', back_populates='team', lazy='select')
    users = db.relationship('TeamUserLink', back_populates='team',
                            lazy='select')
