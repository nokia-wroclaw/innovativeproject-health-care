from datetime import timedelta
from flask import abort, request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token
from backend.common.permissions import roles_allowed
from backend.common.ldapconn import LdapConn
from backend.models import User


class AuthRes(Resource):
    """User authentication"""

    def __init__(self):
        self.ldap = LdapConn()

    def post(self):
        """Authenticates user.

        This method authenticates users credentials sent by HTTP Basic Auth.
        If authentication is successful JWT containing user data is returned.
        """

        credentials = request.authorization

        # If user didn't send credentials
        if not credentials:
            abort(401)

        auth = self.ldap.authenticate(credentials.username,
                                      credentials.password)

        # If credentials are incorrect
        if not auth:
            abort(401)

        # Retrieve user data from LDAP and create user object
        ldap_user = self.ldap.search(credentials.username, True)[0]
        user = User.from_ldap(ldap_user)

        # Abort if user is not in db and is not an admin
        if (user.in_db() or user.is_admin()) is False:
            abort(401)

        token = create_access_token(user, expires_delta=timedelta(hours=1))

        response = jsonify({'access_token': token})
        response.status_code = 200
        return response


class UsersRes(Resource):
    """All users available to system."""

    @roles_allowed(['admin', 'editor', 'manager'])
    def get(self):
        """ Get available users from db and LDAP. Search phrase required."""

        args = request.args
        if not args['q']:
            abort(400, 'No search phrase given.')
        phrase = args['q']

        if len(phrase) <= 3:
            abort(400, 'Search phrase too short, minimum length is 4 character')

        ldap = LdapConn()
        matches = ldap.search(phrase)
        users = [User.from_ldap(m) for m in matches]

        response = jsonify([u.serialize(True) for u in users])
        response.status_code = 200
        return response
