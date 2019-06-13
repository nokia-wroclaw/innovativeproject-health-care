from datetime import date

from dateutil.relativedelta import relativedelta
from flask import abort

from backend.app import db
from backend import models


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
        """Fetches end date of this period.

        End date means the last day of this period.

        :return: End date of this period.
        :rtype: date
        """

        # Find survey from that period
        survey = models.Survey.from_period(self)
        if survey is None:
            return None

        # Calculate start date of the next survey
        next_start = self.date_start + relativedelta(months=survey.period_len)

        # End date is start day of next period minus one day
        return next_start - relativedelta(days=1)

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
