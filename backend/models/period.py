from backend.app import db


class Period(db.Model):

    __tablename__ = 'periods'

    tribe_id = db.Column(db.Integer, db.ForeignKey('tribes.id'))
    date_start = db.Column(db.Date, primary_key=True)

    def __init__(self, tribe_id, date_start):
        self.tribe_id = tribe_id
        self.date_start = date_start