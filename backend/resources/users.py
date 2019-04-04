from flask import abort, request, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from backend.common.ldapconn import LdapConn
from backend.models import User


class Users(Resource):
    '''All users available to system.'''

    @jwt_required
    def get(self):
        ''' Get available users from db and LDAP. Search phrase required.'''

        args = request.args
        if not args['q']:
            abort(422, 'No search phrase given.')
        phrase = args['q']

        if len(phrase) <= 3:
            abort(422, 'Search phrase to short, minimun length is 4 character')

        ldap = LdapConn()
        matches = ldap.search(phrase)
        users = [User.from_ldap(m) for m in matches]

        response = jsonify([u.serialize(True) for u in users])
        response.status_code = 200
        return response
