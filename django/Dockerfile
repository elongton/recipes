FROM python:3.7
ENV PYTHONUNBUFFERED 1

RUN ["apk", "update"]
RUN ["apk", "add", "nano"]


RUN mkdir /src;
RUN mkdir /src/mediafiles;
ADD ./requirements.txt /src/requirements.txt
RUN pip install -r ./src/requirements.txt
ADD . /src
WORKDIR /src
RUN python manage.py collectstatic