from ldap3 import Server, Connection, NONE
import backend.config as conf


class LdapConn:
    '''Handle LDAP searches and authentication.'''

    def __init__(self):
        self.url = conf.LDAP_URL
        self.port = conf.LDAP_PORT
        self.ssl = conf.LDAP_SSL
        self.user = conf.LDAP_USER
        self.passwd = conf.LDAP_PASS
        self.base_dn = conf.LDAP_BASE_DN
        self.id_attr = conf.LDAP_ID_ATTR
        self.rdn_attr = conf.LDAP_RDN_ATTR
        self.login_attr = conf.LDAP_LOGIN_ATTR
        self.name_attr = conf.LDAP_NAME_ATTR
        self.mail_attr = conf.LDAP_MAIL_ATTR

        self.search_exact = False
        self.search_attributes = [self.name_attr, self.login_attr,
                                  self.mail_attr]

        self.server = Server(self.url, self.port, self.ssl, get_info=NONE)

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

        conn = Connection(self.server, self.user, self.passwd, auto_bind=True,
                          read_only=True)
        get_attr = [self.id_attr, self.login_attr, self.name_attr,
                    self.mail_attr, self.rdn_attr]
        conn.search(self.base_dn, filter, attributes=get_attr)

        matches = []
        for match in conn.response:
            attributes = match['attributes']
            matches.append({
                'id': attributes[self.id_attr][0],
                'login': attributes[self.login_attr][0],
                'name': attributes[self.name_attr][0],
                'mail': attributes[self.mail_attr][0],
                'rdn': attributes[self.rdn_attr][0]
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

        dn = '%s=%s,%s' % (self.rdn_attr, login, self.base_dn)
        conn = Connection(self.server, dn, password, read_only=True)

        if conn.bind():
            return True

        matches = self.search(login, True, [self.login_attr, self.mail_attr])

        if len(matches) != 1:
            return False

        dn = '%s=%s,%s' % (self.rdn_attr, matches[0]['rdn'], self.base_dn)
        conn = Connection(self.server, dn, password, read_only=True)

        return conn.bind()
