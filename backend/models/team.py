from flask import abort
from backend.app import db


class Team(db.Model):

    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    tribe_id = db.Column(db.Integer, db.ForeignKey('tribes.id'))
    name = db.Column(db.String(64))

    tribe = db.relationship('Tribe', back_populates='teams', lazy='joined')
    actions = db.relationship('Action', back_populates='team', lazy='select')
    users = db.relationship('TeamUserLink', back_populates='team',
                            lazy='select', cascade='all, delete, delete-orphan')

    def __init__(self, tribe_id, name):
        self.tribe_id = tribe_id
        self.name = name

    def serialize(self):
        data = {
            'id': self.id,
            'tribe_id': self.tribe_id,
            'name': self.name,
        }
        return data

    @staticmethod
    def get_if_exists(team_id):
        """Fetches team with given id if it exists, aborts with
        404 status otherwise.
        """

        tribe = Team.query.filter_by(id=team_id).first()
        if tribe is None:
            abort(404, 'Could not find team with given id.')
        return tribe

