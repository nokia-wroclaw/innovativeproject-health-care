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
from backend.resources import (auth, editors, editor, users, tribes,
        tribe, tribe_editors, teams, team)  # noqa: E402

if os.environ.get('FLASK_ENV') == 'development':
    CORS(app)

api.add_resource(auth.Auth, '/auth')
api.add_resource(editors.Editors, '/editors')
api.add_resource(editor.Editor, '/editors/<user_id>')
api.add_resource(users.Users, '/users')
api.add_resource(tribes.Tribes, '/tribes')
api.add_resource(tribe.TribeRes, '/tribes/<tribe_id>')
api.add_resource(tribe_editors.TribeEditors, '/tribes/<tribe_id>/editors/<user_id>')
api.add_resource(teams.Teams, '/tribes/<tribe_id>/teams')
api.add_resource(team.TeamRes, '/teams/<team_id>')

if __name__ == '__main__':
    app.run(debug=True)
