import unittest
from unittest.mock import patch
import backend.app as back
from base64 import b64encode


def ldap_authenticate(login, password):
    if login == 'user' and password == 'password':
        return True
    else:
        return False


class AuthTest(unittest.TestCase):

    def setUp(self):
        self.app = back.app.test_client()
        self.ldap_search_ret = {
            'id': '123456',
            'login': 'user',
            'name': 'Test User',
            'mail': 'test@example.com',
            'rdn': 'user',
        }
        self.test_data = [
            ('user:password', 200),
            ('test:password', 401),
            ('user:test', 401),
            ('test:test', 401),
            ('', 401)
        ]

    @patch('backend.resources.auth.User.in_db', autospec=True)
    @patch('backend.resources.auth.LdapConn', autospec=True)
    def test_login(self, mock_ldap, mock_in_db):
        ldap = mock_ldap()
        ldap.authenticate.side_effect = ldap_authenticate
        ldap.search.return_value = [self.ldap_search_ret]
        mock_in_db.return_value = True

        for credentials, status in self.test_data:
            with self.subTest():
                cred = b64encode(bytes(credentials, 'utf-8')).decode('utf-8')
                resp = self.app.post('/auth',
                                     headers={'Authorization': 'Basic ' + cred})
                self.assertEqual(resp.status_code, status)
