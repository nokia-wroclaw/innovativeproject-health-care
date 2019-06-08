from flask import abort

from backend.app import db


class Survey(db.Model):
    __tablename__ = 'surveys'

    id = db.Column(db.Integer, primary_key=True)
    tribe_id = db.Column(db.Integer, db.ForeignKey('tribes.id'))
    date = db.Column(db.Date, nullable=True)
    period_len = db.Column(db.Integer, default=1)
    draft = db.Column(db.Boolean)

    tribe = db.relationship('Tribe', back_populates='surveys', lazy='joined')
    questions = db.relationship('SurveyQuestionLink',
                                back_populates='survey',
                                lazy='joined',
                                cascade='all, delete, delete-orphan',
                                order_by='SurveyQuestionLink.order')

    def __init__(self, tribe_id, draft):
        self.tribe_id = tribe_id
        self.draft = draft

    @staticmethod
    def from_period(period):
        """Returns survey that was active during given period.

        :param Period period: Period object.
        :return: Survey from specified period.
        :rtype: Survey
        """

        survey = (
            Survey.query
            .filter(
                Survey.tribe_id == period.tribe_id,
                Survey.draft == False,
                Survey.date <= period.date_start
            )
            .order_by(Survey.date.desc())
            .first()
        )

        return survey

    @staticmethod
    def get_if_exists(survey_id):
        """Fetches survey with given id if it exists, aborts with
        404 status otherwise.

        :param int survey_id: Id of the survey.
        :return: Survey with specified id.
        :rtype: Survey
        """

        survey = Survey.query.filter_by(id=survey_id).one_or_none()
        if survey is None:
            abort(404, 'Requested survey does not exist.')
        return survey

    @staticmethod
    def validate_access(tribe_id, user):
        """Checks if any of the given user's roles allows him to access
        survey belonging to the tribe with given id.

        :param int tribe_id: Id of the tribe.
        :param User user: User whose access will be validated.
        :return: Whether user has access.
        :rtype: bool
        """

        tribe_id = int(tribe_id)

        if tribe_id in [t.team.tribe_id for t in user.teams]:
            return True

        if tribe_id in user.editing_ids():
            return True

        return False

    def serialize_questions(self):
        """Serializes questions and adds 'order' attribute from
        SurveyQuestionLink.

        :return: Serialized questions from this survey.
        :rtype: list
        """

        questions = []
        for l in self.questions:
            question = l.question.serialize()
            question['order'] = l.order
            questions.append(question)
        return questions

    def serialize(self):
        """Serializes survey object.

        :return: Serialized survey.
        :rtype: dict
        """

        data = {
            'id': self.id,
            'tribe_id': self.tribe_id,
            'date': self.date.isoformat() if self.date else None,
            'draft': self.draft,
            'period_len': self.period_len,
            'questions': self.serialize_questions()
        }
        return data
