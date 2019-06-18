import smtplib
from email.header import Header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from backend.app import app


class SmtpConn:
    """Helper for sending emails via SMTP server."""

    def __init__(self):
        """Opens SMTP connection.
        """

        if app.config['SMTP_SSL']:
            self.conn = smtplib.SMTP_SSL(app.config['SMTP_URL'],
                                         app.config['SMTP_PORT'])
        else:
            self.conn = smtplib.SMTP(app.config['SMTP_URL'],
                                     app.config['SMTP_PORT'])

        if app.config['SMTP_USER'] and app.config['SMTP_PASS']:
            self.conn.login(app.config['SMTP_MAIL'], app.config['SMTP_PASS'])

        if app.config['SMTP_STARTTLS']:
            self.conn.starttls()

    def send(self, recipients, subject, body):
        """Sends an email.

        This method sends email with given subject and body to one or many
        recipients.

        :param list recipients: List of recipients.
        :param string subject: Subject of the email.
        :param string body: Body of the email.
        """

        if recipients is None or len(recipients) == 0:
            return

        sender = app.config['SMTP_MAIL']
        message = MIMEMultipart()
        message['From'] = sender
        message['To'] = ', '.join(recipients)
        message['Subject'] = Header(subject, 'UTF-8')
        message.attach(MIMEText(body, 'plain'))
        self.conn.sendmail(sender, recipients, message.as_string())

    def close(self):
        """Closes SMTP connection.
        """

        self.conn.quit()
