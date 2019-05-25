import unittest
from unittest.mock import patch
import backend.app as back


def verify_jwt():
    return


class UserTest(unittest.TestCase):

    def setUp(self):
        self.app = back.app.test_client()
        self.user_roles = [('admin', 200), ('editor', 200), ('manager', 200), ('user', 403)]
        self.user = {
            'id': '1',
            'login': 'login',
            'mail': 'mail',
            'name': 'name',
        }
        
    #   TODO fix permission mock - always return 403 status code
    @patch('backend.common.permissions.verify_jwt_in_request', autospec=True)
    @patch('backend.common.permissions.get_jwt_identity', autospec=True)
    @patch('backend.common.permissions.User')
    @patch('backend.resources.users.User')
    def test_get_user(self, mock_user_user, mock_permission_user, mock_get_jwt, mock_verify_jwt):
        permission_user = mock_permission_user()
        permission_user.from_id.return_value = 1

        get_jwt = mock_get_jwt()
        get_jwt.return_value = 1

        ver_jwt = mock_verify_jwt()
        ver_jwt.side_effect = verify_jwt

        user_user = mock_user_user()
        user_user.get_if_exists.return_value = 'user'
        user_user.serialize.return_value = self.user

        for role, status in self.user_roles:
            with self.subTest():
                permission_user.roles.return_value = role
                resp = self.app.get('/users/1')
                self.assertEqual(resp.status_code, status)

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
