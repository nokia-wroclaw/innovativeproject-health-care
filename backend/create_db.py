from backend.app import db
from backend.models import *

db.drop_all()
db.create_all()
