from datetime import date

from flask_apscheduler import APScheduler

from backend.app import app
from backend.common.smtpconn import SmtpConn
from backend.models import Tribe


def schedule_notifications():
    """Creates a scheduler and schedules notifications.
    """

    scheduler = APScheduler(app=app)
    scheduler.add_job(id='new_period',
                      func=notify_new_period,
                      trigger='cron',
                      day=app.config['NOTIFY_NEW_DAYS'])
    scheduler.add_job(id='unfilled_survey',
                      func=notify_unfilled_survey,
                      trigger='cron',
                      day=app.config['NOTIFY_UNFILLED_DAYS'])
    scheduler.start()


def notify_new_period():
    """Sends email notifications to members of all teams in tribes where new
    survey period started this month.
    """

    mailserver = SmtpConn()

    # Find tribes with period starting this month
    notify_tribes = []
    for tr in Tribe.query.all():
        tr.update_periods()
        if tr.current_period() is None:
            continue
        if tr.current_period().date_start.month == date.today().month:
            notify_tribes.append(tr)

    # For all those tribes
    for tr in notify_tribes:
        end = tr.current_period().date_end()
        # For all teams
        for tm in tr.teams:
            # Fetch list of users email addresses
            addresses = [l.user.mail for l in tm.users if l.manager is False]
            # Format subject and body
            subject = app.config['NOTIFY_NEW_SUB'].format(team=tm.name,
                                                          end=end)
            body = app.config['NOTIFY_NEW_BODY'].format(team=tm.name,
                                                        end=end)
            # And send
            mailserver.send(addresses, subject, body)

    mailserver.close()


def notify_unfilled_survey():
    """Sends email notifications to members of all teams where survey period
    ends this month and survey isn't filled yet.
    """

    mailserver = SmtpConn()

    # Find tribes with period starting this month
    notify_tribes = []
    for tr in Tribe.query.all():
        tr.update_periods()
        if tr.current_period() is None:
            continue
        if tr.current_period().date_end().month == date.today().month:
            notify_tribes.append(tr)

    for tr in notify_tribes:
        end = tr.current_period().date_end()
        for tm in tr.teams:
            # Skip team if it already filled the survey
            if tm.answered():
                continue
            # Fetch list of users email addresses
            addresses = [l.user.mail for l in tm.users if l.manager is False]
            # Format subject and body
            subject = app.config['NOTIFY_UNFILLED_SUB'].format(team=tm.name,
                                                               end=end)
            body = app.config['NOTIFY_UNFILLED_BODY'].format(team=tm.name,
                                                             end=end)
            # And send
            mailserver.send(addresses, subject, body)

    mailserver.close()
