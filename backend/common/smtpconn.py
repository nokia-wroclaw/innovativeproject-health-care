import smtplib
import ssl
from email.header import Header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from backend.app import app


class SmtpConn:
    """Helper for sending emails via SMTP server."""

    def __init__(self):
        """Opens SMTP connection.
        """

        self.context = ssl.create_default_context()
        self.conn = smtplib.SMTP_SSL(app.config['SMTP_URL'],
                                     app.config['SMTP_PORT'],
                                     self.context)
        self.conn.login(app.config['SMTP_MAIL'], app.config['SMTP_PASS'])

    def send(self, recipients, subject, body):
        """Sends an email.

        This method sends email with given subject and body to one or many
        recipients.

        :param list recipients: List of recipients.
        :param string subject: Subject of the email.
        :param string body: Body of the email.
        """

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
