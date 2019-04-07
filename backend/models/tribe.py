from backend.app import db


class Tribe(db.Model):

    __tablename__ = 'tribes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))

    teams = db.relationship('Team', back_populates='tribe', lazy='select')
    periods = db.relationship('Period', lazy='select')
    surveys = db.relationship('Survey', back_populates='tribe', lazy='select')
    editors = db.relationship('User', back_populates='editing',
                              secondary='editors', lazy='joined')

    def __init__(self, name):
        self.name = name

    def teams_ids(self):
        return [t.id for t in self.teams]

    def surveys_ids(self):
        return [s.id for s in self.surveys]

    def editors_ids(self):
        return [e.id for e in self.editors]

    def serialize(self, verbose=False):
        data = {
            'id': self.id,
            'name': self.name,
        }
        if not verbose:
            return data
        extra = {
            'editors': self.editors_ids(),
            'teams': self.teams_ids(),
            'surveys': self.surveys_ids(),
        }
        data.update(extra)
        return data
