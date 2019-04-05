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
        requesting_user = User.from_id(id)

        if requesting_user.is_admin():
            return fn(*args, **kwargs)
        else:
            return abort(403)

    return wrapper
