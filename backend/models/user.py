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

    def __init__(self, id, login, mail, full_name, editor):
        self.id = id
        self.login = login
        self.mail = mail
        self.full_name = full_name
        self.editor = editor

    @staticmethod
    def from_ldap(data):
        user = User.query.filter_by(id=data['id']).first()
        if user is not None:
            return user
        else:
            user = User(data['id'], data['login'], data['mail'], data['name'],
                        False)
            return user

    @staticmethod
    def from_id(id):
        user = User.query.filter_by(id=self.id).first()
        if user is not None:
            return user
        else:
            ldap = LdapConn()
            data = ldap.search(id, True)[0]
            user = User(data['id'], data['login'], data['mail'], data['name'],
                        False)
            return user

    def in_db(self):
        user = User.query.filter_by(id=self.id).first()
        return True if user is not None else False;

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

    def roles(self):
        roles = []

        if self.is_admin():
            roles.append('admin')
        if self.is_editor():
            roles.append('editor')
        if self.is_manager():
            roles.append('manager')
        if self.is_user():
            roles.append('user')

        return roles

    def team_ids(self):
        return [t.team_id if t.manager is False else None
                for t in self.teams]

    def managing_ids(self):
        return [t.team_id if t.manager is True else None
                for t in self.teams]

    def editing_ids(self):
        return [e.id
                for e in self.editing]

    def get_json(self):
        return {
            'id': self.id,
            'login': self.login,
            'mail': self.mail,
            'name': self.full_name,
            'roles': self.roles(),
            'teams': self.team_ids(),
            'managing': self.managing_ids(),
            'editing': self.editing_ids(),
        }
