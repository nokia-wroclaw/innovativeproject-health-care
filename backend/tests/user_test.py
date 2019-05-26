import unittest
from unittest.mock import patch
import backend.app as back
from backend.models.user import User
import json


def verify_jwt():
    return


class UserTest(unittest.TestCase):

    def setUp(self):
        self.app = back.app.test_client()
        self.user_roles = [('admin', User(1, 'login', 'password', 'name', True), 200),
                           ('editor', User(2, 'login', 'password', 'name', True), 200),
                           ('manager', None, 404),
                           ('user', User(4, 'login', 'password', 'name', True), 403)]
        self.ldap_search_ret = {
            'id': '123456',
            'login': 'user',
            'name': 'Test User',
            'mail': 'test@example.com',
            'rdn': 'user',
        }
        self.user = {
            'id': '1',
            'login': 'login',
            'mail': 'mail',
            'name': 'name',
        }

    @patch('backend.resources.users.User')
    @patch('backend.resources.users.LdapConn', autospec=True)
    def test_get_user(self, mock_ldap, mock_user):
        ldap = mock_ldap()
        user = mock_user()
        ldap.authenticate.return_value = True
        ldap.search.return_value = [self.ldap_search_ret]
        user.in_db.return_value = True
        user.serialize.return_value = self.user
        for role, u, status in self.user_roles:
            with self.subTest():
                user.roles.return_value = role
                user.from_ldap.return_value = u
                user.from_id.return_value = u
                user.get_if_exists.return_value = u
                resp = self.app.post('/auth',
                                     headers={'Authorization': 'Basic '})
                # TODO get token from response
                token = json.load(resp.get_data(as_text=True))

                resp = self.app.get('/users/1', headers={'Authorization': 'Bearer ' + token['access_token']})
                self.assertEqual(resp.status_code, status)

    # 1
    # @patch('backend.common.permissions.verify_jwt_in_request', autospec=True)
    # @patch('backend.common.permissions.get_jwt_identity', autospec=True)
    # @patch('backend.common.permissions.User')
    # @patch('backend.resources.users.User')
    # def test_get_user(self, mock_user_user, mock_permission_user, mock_get_jwt, mock_verify_jwt):
    #     permission_user = mock_permission_user()
    #     permission_user.from_id.return_value = 1
    #
    #     get_jwt = mock_get_jwt()
    #     get_jwt.return_value = 1
    #
    #     ver_jwt = mock_verify_jwt()
    #     ver_jwt.side_effect = verify_jwt
    #
    #     user_user = mock_user_user()
    #     user_user.get_if_exists.return_value = 'user'
    #     user_user.serialize.return_value = self.user
    #
    #     for role, status in self.user_roles:
    #         with self.subTest():
    #             permission_user.roles.return_value = role
    #             resp = self.app.get('/users/1')
    #             self.assertEqual(resp.status_code, status)

    # 2
    # @patch('backend.common.permissions.verify_jwt_in_request', autospec=True)
    # @patch('backend.common.permissions.get_jwt_identity', autospec=True)
    # @patch('backend.common.permissions.User.from_id', autospec=True)
    # @patch('backend.common.permissions.User.roles', autospec=True)
    # @patch('backend.resources.users.User.get_if_exists', autospec=True)
    # @patch('backend.resources.users.User.serialize', autospec=True)
    # def test_get_user(self, mock_serialize, mock_get_if_exists, mock_roles, mock_from_id, mock_get_jwt, mock_verify_jwt):
    #     user_roles = mock_roles()
    #     from_id = mock_from_id()
    #     from_id.return_value = 'user'
    #     get_jwt = mock_get_jwt()
    #     get_jwt.return_value = 1
    #     ver_jwt = mock_verify_jwt()
    #     ver_jwt.return_value = ""
    #     get_if_exists = mock_get_if_exists()
    #     get_if_exists.return_value = 'user'
    #     serialize = mock_serialize()
    #     serialize.return_value = self.user
    #
    #     for role, status in self.user_roles:
    #         with self.subTest():
    #             user_roles.return_value = role
    #             resp = self.app.get('/users/1')
    #             self.assertEqual(resp.status_code, status)
