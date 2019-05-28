from datetime import date
from dateutil.relativedelta import relativedelta
from flask import abort
from backend.app import db
from backend.models import Survey, Period, Team, Answer


class Tribe(db.Model):
    __tablename__ = 'tribes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))

    teams = db.relationship('Team', back_populates='tribe', lazy='select',
                            cascade='all, delete, delete-orphan')
    periods = db.relationship('Period', lazy='select',
                              cascade='all, delete, delete-orphan')
    surveys = db.relationship('Survey', back_populates='tribe', lazy='select',
                              cascade='all, delete, delete-orphan')
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

    def draft_survey(self):
        return Survey.query.filter_by(tribe_id=self.id, draft=True)\
            .one_or_none()

    def active_survey(self):
        return Survey.query.filter(Survey.tribe_id == self.id,
                                   Survey.draft == False,
                                   Survey.date <= date.today())\
            .order_by(Survey.date.desc()).first()

    def next_survey(self):
        return Survey.query.filter(Survey.tribe_id == self.id,
                                   Survey.draft == False,
                                   Survey.date > date.today())\
            .order_by(Survey.date.desc()).first()

    def current_period(self):
        return Period.query.filter(
            db.and_(Period.tribe_id == self.id,
                    Period.date_start <= date.today()))\
            .order_by(Period.date_start.desc()).first()

    def latest_period(self):
        return Period.query.filter_by(tribe_id=self.id)\
            .order_by(Period.date_start.desc()).first()

    def update_periods(self):
        active_survey = self.active_survey()
        if active_survey is None:
            return
        period_len = active_survey.period_len

        while True:
            latest = self.latest_period()
            before = date.today() + relativedelta(months=-period_len)

            if latest.date_start > before:
                break

            new_date = latest.date_start + relativedelta(months=+period_len)
            new = Period(self.id, new_date)
            db.session.add(new)
            db.session.commit()

    def get_answers(self, period):
        """Returns matrix of answers along with teams and questions labels
        for a given period."""

        # Teams for this tribe could have been different in requested period
        date_start = period.date_start
        date_end = period.date_end()

        if date_start > date.today():
            return None

        if period == self.current_period():
            # If current period is requested use current list of teams
            teams = self.teams
        else:
            # Otherwise create list of teams basing on the answers
            teams = Team.query.join(Team.answers).filter(
                    Team.tribe_id == self.id,
                    Answer.date >= date_start,
                    Answer.date < date_end
                ).distinct(Team.id).all()

        survey = Survey.from_period(period)
        questions = survey.questions

        # Map team's ids to rows numbers and question's ids to column numbers
        teams_map = {t.id: i for (i, t) in enumerate(teams)}
        questions_map = {q.question.id: i for (i, q) in enumerate(questions)}

        # Prepare matrix with rows for teams and columns for questions
        matrix = [[None] * len(survey.questions) for t in teams]

        # Place answers in the matrix basing on teams and questions ids
        for t in teams:
            row = teams_map[t.id]
            for a in t.get_answers(period):
                column = questions_map[int(a['question_id'])]
                matrix[row][column] = a['answer']

        # Append order to the serialized questions
        questions_ret = []
        for q in questions:
            question = q.question.serialize()
            question['order'] = q.order
            questions_ret.append(question)

        answers = {
            'teams': [t.serialize() for t in teams],
            'questions': questions_ret,
            'matrix': matrix
        }

        return answers

    def get_averages(self, period):
        """Returns list of answer averages for each team in this tribe in
        the given period."""

        if period == self.current_period():
            # If current period is requested use current list of teams
            teams = self.teams
        else:
            # Otherwise create list of teams basing on the answers
            teams = Team.query.join(Team.answers).filter(
                Team.tribe_id == self.id,
                Answer.date >= period.date_start,
                Answer.date < period.date_end()
            ).distinct(Team.id).all()

        averages = []
        for t in teams:
            averages.append(t.get_average(period))

        results = {
            'teams': [t.serialize() for t in teams],
            'averages': averages
        }

        return results

    @staticmethod
    def get_if_exists(tribe_id):
        """Fetches tribe with given id if it exists, aborts with
        404 status otherwise.
        """

        tribe = Tribe.query.filter_by(id=tribe_id).first()
        if tribe is None:
            abort(404, 'Could not find tribe with given id.')
        return tribe

    @staticmethod
    def validate_access(tribe_id, user):
        """Checks if given user has rights to edit tribe with given id.
        Aborts with 403 code if not.
        """

        if (user.is_admin() is False and
                int(tribe_id) not in user.editing_ids()):
            return abort(403)

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
