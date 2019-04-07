from functools import wraps
from flask import abort
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from backend.models import User


def roles_allowed(roles):
    '''Takes a list of roles allowed to acces decorated endopoint.
    Aborts with 403 status if user with unauthorized role tries to acces
    this endpoint.
    '''

    def roles_allowed_decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()

            id = get_jwt_identity()
            user = User.from_id(id)

            for role in user.roles():
                if role in roles:
                    return fn(*args, **kwargs)

            abort(403)

        return wrapper
    return roles_allowed_decorator
