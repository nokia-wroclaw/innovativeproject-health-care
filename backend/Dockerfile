FROM python:3
ENV APP /backend
WORKDIR /backend
COPY requirements.txt /app
COPY . /backend
RUN pip3 install -r requirements.txt
EXPOSE 5000

CMD ["uwsgi", "--ini", "/backend/uwsgi.ini"]
