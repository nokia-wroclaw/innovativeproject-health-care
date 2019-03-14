FROM python:latest
WORKDIR /srv/www/backend
COPY requirements.txt .
RUN pip3 install -r requirements.txt
EXPOSE 5000

CMD ["uwsgi", "--ini", "uwsgi.ini"]
