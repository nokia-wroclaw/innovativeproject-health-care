import os
from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from backend import config
from backend.resources import auth

app = Flask(__name__)

app.config.from_object(config)
app.config['JWT_IDENTITY_CLAIM'] = 'sub'
app.config['JWT_USER_CLAIMS'] = 'user'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app)
jwt = JWTManager(app)
db = SQLAlchemy(app)

if os.environ.get('FLASK_ENV') == 'development':
    CORS(app)

api.add_resource(auth.Auth, '/auth')

if __name__ == '__main__':
    app.run(debug=True)
