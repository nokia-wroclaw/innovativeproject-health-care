from functools import wraps
from flask import abort
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from backend.models import User


def admin_required(fn):
    '''Allows function execution only if user identified by JWT in request
    has admin rights.
    '''

    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        id = get_jwt_identity()
        user = User.from_id(id)

        if user.is_admin():
            return fn(*args, **kwargs)
        else:
            return abort(403)

    return wrapper


def editor_required(fn):
    '''Allows function execution if token bearer is an editor or admin.
    If specific tribe id is given it will allow only if he has rights
    to this tribe.
    '''

    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        id = get_jwt_identity()
        user = User.from_id(id)

        if user.is_admin() or user.is_editor():
            return fn(*args, **kwargs)
        else:
            return abort(403)

    return wrapper


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
