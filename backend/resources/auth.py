from datetime import timedelta
from flask import request, abort, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token
from backend.common.ldapconn import LdapConn


class Auth(Resource):
    '''User authentication'''

    def __init__(self):
        self.ldap = LdapConn()

    def post(self):
        '''Auhenticates user.

        This method authenticates users credentials sent by HTTP Basic Auth.
        If authentication is succesfull JWT containing user data is returned.
        '''

        credentials = request.authorization

        if not credentials:
            abort(401)

        auth = self.ldap.authenticate(credentials.username,
                                      credentials.password)

        if not auth:
            abort(401)

        user = self.ldap.search(credentials.username, True)
        token = create_access_token(user, expires_delta=timedelta(hours=1))

        response = jsonify({'access_token': token})
        response.status_code = 200
        return response
