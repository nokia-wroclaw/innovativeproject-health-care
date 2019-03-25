from backend import db


class Tribe(db.Model):

    _tablename_ = 'tribes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))

    teams = db.relationship('Team', back_populates='tribe', lazy='select')
    periods = db.relationship('Period', lazy='select')
    surveys = db.relationship('Survey', back_populates='tribe', lazy='select')
    editors = db.relationship('User', back_populates='editing',
                              secondary='editors', lazy='joined')
