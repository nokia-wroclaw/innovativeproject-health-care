from backend.app import db


class Period(db.Model):

    __tablename__ = 'periods'

    id = db.Column(db.Integer, primary_key=True)
    tribe_id = db.Column(db.Integer, db.ForeignKey('tribes.id'))
    date_start = db.Column(db.Date)

    def __init__(self, tribe_id, date_start):
        self.tribe_id = tribe_id
        self.date_start = date_start

    def serialize(self):
        data = {
            'id': self.id,
            'tribe_id': self.tribe_id,
            'date_start': self.date_start.isoformat(),
        }
        return data
