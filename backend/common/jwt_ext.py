from backend.app import jwt
from backend.models import User


@jwt.user_identity_loader
def user_identity(user):
    return user.id


@jwt.user_claims_loader
def user_claims(user):
    return user.serialize(verbose=True)


@jwt.user_loader_callback_loader
def user_from_identity(identity):
    return User.from_id(identity)
