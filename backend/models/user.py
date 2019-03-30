from backend.app import db, app


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

    @staticmethod
    def from_ldap(data):
        user = User.query.filter_by(id=data['id']).first()
        if user is not None:
            return user;
        else:
            user = User(data['login'], data['mail'], data['name'], False)
            user.id = data['id']
            return user

    def is_admin(self):
        if self.login in app.config['APP_ADMINS']:
            return True
        return False

    def is_editor(self):
        return self.editor

    def is_manager(self):
        for team in self.teams:
            if team.manager is True:
                return True
        return False

    def is_user(self):
        for team in self.teams:
            if team.manager is not True:
                return True
        return False

    def get_json(self):
        return {
            'id': self.id,
            'login': self.login,
            'mail': self.mail,
            'name': self.full_name
        }
