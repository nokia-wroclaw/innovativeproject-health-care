from backend.app import db


class User(db.Model):

    __tablename__ = 'users'

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

    def __init__(self, login, mail, full_name, editor):
        self.login = login
        self.mail = mail
        self.full_name = full_name
        self.editor = editor
