from datetime import date, timedelta

from flask import abort

from backend.app import db


class Period(db.Model):

    __tablename__ = 'periods'

    id = db.Column(db.Integer, primary_key=True)
    tribe_id = db.Column(db.Integer, db.ForeignKey('tribes.id'))
    date_start = db.Column(db.Date)

    tribe = db.relationship('Tribe', back_populates='periods', lazy='joined')

    def __init__(self, tribe_id, date_start):
        self.tribe_id = tribe_id
        self.date_start = date_start

    def date_end(self):
        """Fetches date when this periods ends.

        :return: End date of this period.
        :rtype: date
        """

        # Find next period to determine end of the given period
        n_period = (
            Period.query
            .filter(
                Period.tribe_id == self.tribe_id,
                Period.date_start > self.date_start
            )
            .order_by(Period.date_start.asc())
            .first()
        )

        # End of the given period is either start of the next period
        # or tomorrow if there is no next period
        date_end = (n_period.date_start if n_period is not None
                    else date.today() + timedelta(days=1))

        return date_end

    def previous(self):
        """Returns period immediately before this period.

        :return: Period before this.
        :rtype: Period
        """

        previous_period = (
            Period.query
            .filter(
                Period.tribe_id == self.tribe_id,
                Period.date_start < self.date_start
            )
            .order_by(Period.date_start.desc())
            .first()
        )

        return previous_period

    @staticmethod
    def get_if_exists(period_id):
        """Fetches period with given id if it exists, aborts with
        404 status otherwise.

        :param int period_id: Id of the period.
        :return: Period with requested id.
        :rtype: Period
        """

        period = Period.query.filter_by(id=period_id).first()
        if period is None:
            abort(404, 'Could not find period with given id.')
        return period

    def serialize(self):
        """Serializes period object.

        :return: Serialized period.
        :rtype: dict
        """

        data = {
            'id': self.id,
            'tribe_id': self.tribe_id,
            'date_start': self.date_start.isoformat(),
        }
        return data
