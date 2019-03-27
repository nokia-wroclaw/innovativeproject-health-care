from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from backend import config


app = Flask(__name__)

app.config.from_object(config)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app)
db = SQLAlchemy(app)

if __name__ == '__main__':
    app.run(debug=True)
