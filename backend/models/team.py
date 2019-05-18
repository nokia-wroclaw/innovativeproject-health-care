from datetime import date
from flask import abort
from backend.app import db
from backend.models import Answer, Survey


class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    tribe_id = db.Column(db.Integer, db.ForeignKey('tribes.id'))
    name = db.Column(db.String(64))
    deleted = db.Column(db.Boolean, default=False)

    tribe = db.relationship('Tribe', back_populates='teams', lazy='joined')
    actions = db.relationship('Action', back_populates='team', lazy='select')
    users = db.relationship('TeamUserLink', back_populates='team',
                            lazy='select', cascade='all, delete, delete-orphan')
    answers = db.relationship('Answer', back_populates='team', lazy='select')

    def __init__(self, tribe_id, name):
        self.tribe_id = tribe_id
        self.name = name

    def answered(self):
        self.tribe.update_periods()
        period = self.tribe.current_period()
        if period is None:
            return False

        answered = db.session.query(db.exists().where(db.and_(
            Answer.team_id == self.id,
            Answer.date >= period.date_start))).scalar()

        return answered

    def get_answers(self, period):
        """Returns this team's answers to a survey from the given period.
        Answers are in form of a dict containing key attributes from both
        question and answers."""

        if self.tribe_id is not period.tribe_id:
            return None

        survey = Survey.from_period(period)
        date_start = period.date_start
        date_end = period.date_end()

        if date_start > date.today():
            return None

        if survey is None:
            return []

        answers = []
        for l in survey.questions:
            question = l.question
            answer = Answer.query.filter(
                Answer.question_id == question.id,
                Answer.team_id == self.id,
                Answer.date >= date_start,
                Answer.date < date_end
            ).one_or_none()
            if answer is None:
                continue

            result = {
                'order': l.order,
                'question': question.question,
                'question_id': question.id,
                'answer': answer.answer,
                'comment': answer.comment
            }
            answers.append(result)

        return answers

    def get_average(self, period):
        """Returns average of answers submitted during specified period
        by this team."""

        if self.tribe_id is not period.tribe_id:
            return None

        survey = Survey.from_period(period)
        date_start = period.date_start
        date_end = period.date_end()

        if survey is None or date_start > date.today():
            return None

        # Fetch all answers from this team in given period
        answers = Answer.query.filter(
            Answer.team_id == self.id,
            Answer.date >= date_start,
            Answer.date < date_end
        ).all()

        # Calculate the average
        total = sum(a.answer for a in answers)
        num = len(answers)
        avg = (total / num) if num != 0 else None

        return avg

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

        tribe = Team.query.filter_by(id=team_id,
                                     deleted=False).first()
        if tribe is None:
            abort(404, 'Could not find team with given id.')
        return tribe
