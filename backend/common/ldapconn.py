from ldap3 import Server, Connection, NONE
from backend.app import app


class LdapConn:
    '''Handle LDAP searches and authentication.'''

    def __init__(self):
        self.search_exact = False
        self.search_attributes = [app.config['LDAP_NAME_ATTR'],
                                  app.config['LDAP_LOGIN_ATTR'],
                                  app.config['LDAP_MAIL_ATTR']]
        self.get_attributes = [app.config['LDAP_ID_ATTR'],
                               app.config['LDAP_LOGIN_ATTR'],
                               app.config['LDAP_NAME_ATTR'],
                               app.config['LDAP_MAIL_ATTR'],
                               app.config['LDAP_RDN_ATTR']]
        self.auth_attributes = [app.config['LDAP_LOGIN_ATTR'],
                                app.config['LDAP_MAIL_ATTR']]
        self.server = Server(app.config['LDAP_URL'],
                             app.config['LDAP_PORT'],
                             app.config['LDAP_SSL'],
                             get_info=NONE)

    def search(self, phrase, exact=None, attributes=None):
        '''Performs exact or non-exact LDAP search by given phrase, in
        specified attributes.

        :param string phrase: phrase to search
        :param bool exact: whether matches have to be exact
        :param list attributes: list of attributes to search in
        :return: list of matches
        :rtype: list of dicts containing users' attributes
        '''

        if exact is None:
            exact = self.search_exact

        if attributes is None:
            attributes = self.search_attributes

        if not exact:
            phrase += '*'

        filter = '(|'
        for attr in attributes:
            filter += '(%s=%s)' % (attr, phrase)
        filter += ')'

        conn = Connection(self.server, app.config['LDAP_USER'],
                          app.config['LDAP_PASS'], auto_bind=True,
                          read_only=True)
        conn.search(app.config['LDAP_BASE_DN'], filter,
                    attributes=self.get_attributes)

        matches = []
        for match in conn.response:
            attributes = match['attributes']
            matches.append({
                'id': attributes[app.config['LDAP_ID_ATTR']][0],
                'login': attributes[app.config['LDAP_LOGIN_ATTR']][0],
                'name': attributes[app.config['LDAP_NAME_ATTR']][0],
                'mail': attributes[app.config['LDAP_MAIL_ATTR']][0],
                'rdn': attributes[app.config['LDAP_RDN_ATTR']][0]
            })

        return matches

    def authenticate(self, login, password):
        '''Verifies given credentials.

        If simple bind of given values fails this method will perform exact
        search of login against login and mail attributes to try to find
        user's correct dn.

        :param string login: user's login or mail
        :param string password: user's password
        :return: whether credentials are correct
        :rtype: bool
        '''

        dn = '%s=%s,%s' % (app.config['LDAP_RDN_ATTR'], login,
                           app.config['LDAP_BASE_DN'])
        conn = Connection(self.server, dn, password, read_only=True)

        if conn.bind():
            return True

        matches = self.search(login, True, self.auth_attributes)

        if len(matches) != 1:
            return False

        dn = '%s=%s,%s' % (app.config['LDAP_RDN_ATTR'], matches[0]['rdn'],
                           app.config['LDAP_BASE_DN'])
        conn = Connection(self.server, dn, password, read_only=True)

        return conn.bind()
