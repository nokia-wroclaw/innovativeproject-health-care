from ldap3 import Server, Connection, ALL
import backend.config as conf


class LdapConn:
    '''Handle LDAP searches and authentication.'''

    def __init__(self):
        self.url = conf.LDAP_URL
        self.user = conf.LDAP_USER
        self.passwd = conf.LDAP_PASS
        self.base_dn = conf.LDAP_BASE_DN
        self.id_attr = conf.LDAP_ID_ATTR
        self.login_attr = conf.LDAP_LOGIN_ATTR
        self.name_attr = conf.LDAP_NAME_ATTR
        self.mail_attr = conf.LDAP_MAIL_ATTR
        self.server = Server(self.url, get_info=ALL)

    def search(self, phrase):
        '''Performs LDAP search using wildcard to get non-exact matches.

        :param string phrase: phrase to search
        :return: list of matches
        :rtype: list of dicts containing user's attributes
        '''

        filter = '(%s=%s*)' % (self.name_attr, phrase)
        conn = Connection(self.server, self.user, self.passwd, auto_bind=True,
                          read_only=True)
        get_attr = [self.id_attr, self.login_attr, self.name_attr,
                    self.mail_attr]
        conn.search(self.base_dn, filter, attributes=get_attr)

        matches = []

        for match in conn.response:
            attributes = match['attributes']
            matches.append({
                'id': attributes[self.id_attr][0],
                'login': attributes[self.login_attr][0],
                'name': attributes[self.name_attr][0],
                'mail': attributes[self.mail_attr][0]
            })

        return matches

    def authenticate(self, login, password):
        '''Verifies given credentials by trying to bind to the server.

        :param string login: user's login
        :param string password: user's password
        :return: Whether credentials are correct
        :rtype: bool
        '''

        dn = '%s=%s,%s' % (self.login_attr, login, self.base_dn)
        conn = Connection(self.server, dn, password, read_only=True)
        return conn.bind()
