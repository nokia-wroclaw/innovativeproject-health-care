import os
from json import load

from flasgger import Swagger
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

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

if app.config['NOTIFY_ENABLE']:
    from backend.common.notify import schedule_notifications
    schedule_notifications()

# Need to be imported after creating the jwt object
from backend.common import jwt_ext
# Needs to be imported after creating the db object
from backend.resources import (users, editors, tribes, teams, surveys, results, actions)  # noqa: E402

# Create db schema if it doesn't exist
db.create_all()

if os.environ.get('FLASK_ENV') == 'development':
    CORS(app)
    with open('backend/swagger.json', 'r') as f:
        app.config['SWAGGER'] = load(f)
    Swagger(app)


api.add_resource(users.AuthRes, '/auth')
api.add_resource(users.UsersRes, '/users')
api.add_resource(users.UserRes, '/users/<user_id>')
api.add_resource(users.UserTeamsRes, '/users/<user_id>/teams')
api.add_resource(users.UserTribesRes, '/users/<user_id>/tribes')
api.add_resource(editors.EditorsRes, '/editors')
api.add_resource(editors.EditorRes, '/editors/<user_id>')
api.add_resource(tribes.TribesRes, '/tribes')
api.add_resource(tribes.TribeRes, '/tribes/<tribe_id>')
api.add_resource(tribes.TribeEditorsRes, '/tribes/<tribe_id>/editors')
api.add_resource(tribes.TribeEditorRes, '/tribes/<tribe_id>/editors/<user_id>')
api.add_resource(teams.TeamsRes, '/tribes/<tribe_id>/teams')
api.add_resource(teams.TeamRes, '/teams/<team_id>')
api.add_resource(teams.TeamManagersRes, '/teams/<team_id>/managers')
api.add_resource(teams.TeamManagerRes, '/teams/<team_id>/managers/<user_id>')
api.add_resource(teams.TeamUsersRes, '/teams/<team_id>/users')
api.add_resource(teams.TeamUserRes, '/teams/<team_id>/users/<user_id>')
api.add_resource(surveys.TribeSurveysRes, '/tribes/<tribe_id>/surveys')
api.add_resource(surveys.SurveyRes, '/surveys/<survey_id>')
api.add_resource(surveys.SurveyAnswersRes, '/surveys/<survey_id>/answers')
api.add_resource(surveys.TribePeriodsRes, '/tribes/<tribe_id>/periods')
api.add_resource(results.ResultsRes, '/results')
api.add_resource(actions.ActionsRes, '/answers/<answer_id>/actions')
api.add_resource(actions.ActionRes, '/actions/<action_id>')


if __name__ == '__main__':
    app.run(debug=True)
