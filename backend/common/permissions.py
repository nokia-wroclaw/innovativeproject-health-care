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


def editor_required(tribe_id=None):
    '''Allows function execution if token bearer is an editor or admin.
    If specific tribe id is given it will allow only if he has rights
    to this tribe.
    '''

    def real_editor_required(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            id = get_jwt_identity()
            requesting_user = User.from_id(id)
            requested_tribe_id = tribe_id if not callable(tribe_id) else None

            if requesting_user.is_admin():
                return fn(*args, **kwargs)

            if requested_tribe_id is None:
                if requesting_user.is_editor() is False:
                    return abort(403)
            else:
                if requested_tribe_id not in requesting_user.editing_ids():
                    return abort(403)

            return fn(*args, **kwargs)
        return wrapper

    if callable(tribe_id):
        return real_editor_required(tribe_id)
    return real_editor_required
