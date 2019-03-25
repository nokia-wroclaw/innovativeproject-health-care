from backend import db


class Period(db.Model):

    _tablename_ = 'periods'

    id = db.Column(db.Integer, primary_key=True)
    date_start = db.Column(db.Date, primary_key=True)
