import os
from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from backend import config

app = Flask(__name__)

app.config.from_object(config)
app.config['JWT_IDENTITY_CLAIM'] = 'sub'
app.config['JWT_USER_CLAIMS'] = 'user'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%s:%s@%s:%s/%s' % \
    (app.config['PG_USER'], app.config['PG_PASS'], app.config['PG_URL'],
     app.config['PG_PORT'], app.config['PG_DB'])

api = Api(app)
jwt = JWTManager(app)
db = SQLAlchemy(app)

# Need to be imported after creating the jwt object
from backend.common import jwt_ext  # noqa: E402, F401
# Needs to be imported after creating the db object
from backend.resources import (users, editors, tribes, teams)  # noqa: E402

if os.environ.get('FLASK_ENV') == 'development':
    CORS(app)

api.add_resource(users.AuthRes, '/auth')
api.add_resource(users.UsersRes, '/users')
api.add_resource(editors.EditorsRes, '/editors')
api.add_resource(editors.EditorRes, '/editors/<user_id>')
api.add_resource(tribes.TribesRes, '/tribes')
api.add_resource(tribes.TribeRes, '/tribes/<tribe_id>')
api.add_resource(tribes.TribeEditorRes, '/tribes/<tribe_id>/editors/<user_id>')
api.add_resource(teams.TeamsRes, '/tribes/<tribe_id>/teams')
api.add_resource(teams.TeamRes, '/teams/<team_id>')

if __name__ == '__main__':
    app.run(debug=True)
