from flask import abort
from backend.app import db, app
from backend.common.ldapconn import LdapConn


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
        user = User.query.filter_by(id=id).first()
        if user is not None:
            return user
        else:
            ldap = LdapConn()
            data = ldap.search(id, True, [app.config['LDAP_ID_ATTR']])
            if len(data) != 1:
                return None
            data = data[0]
            user = User(data['id'], data['login'], data['mail'], data['name'],
                        False)
            return user

    @staticmethod
    def get_if_exists(user_id):
        """Fetches user with given id if it exists, aborts with
        404 status otherwise.
        """

        user = User.from_id(user_id)
        if user is None:
            abort(404, 'Could not find user with given id.')
        return user

    def in_db(self):
        user = User.query.filter_by(id=self.id).first()
        return True if user is not None else False

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
        return [t.team_id for t in self.teams if t.manager is False]

    def managing_ids(self):
        return [t.team_id for t in self.teams if t.manager is True]

    def editing_ids(self):
        return [e.id
                for e in self.editing]

    def revalidate(self):
        """Deletes user from database if he doesn't have at least one role
        other than admin.
        """

        for role in self.roles():
            if role != 'admin':
                return

        db.session.delete(self)
        db.session.commit()

    def serialize(self, verbose=False):
        data = {
            'id': self.id,
            'login': self.login,
            'mail': self.mail,
            'name': self.full_name,
        }
        if not verbose:
            return data
        extra = {
            'roles': self.roles(),
            'teams': self.team_ids(),
            'managing': self.managing_ids(),
            'editing': self.editing_ids(),
        }
        data.update(extra)
        return data
