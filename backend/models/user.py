from backend import db


class User(db.Model):

    _tablename_ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(64), unique=True)
    mail = db.Column(db.String(254), unique=True)
    full_name = db.Column(db.String(64))
    editor = db.Column(db.Boolean)

    actions = db.relationship('Action', back_populates='user', lazy='select')
    teams = db.relationship('TeamUserLink', back_populates='user',
                            lazy='joined')
    editing = db.relationship('Tribe', back_populates='editors',
                              secondary='editors', lazy='select')
