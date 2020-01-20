FROM python:3.7
ENV PYTHONUNBUFFERED 1

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "nano"]


RUN mkdir /src;
RUN mkdir /src/mediafiles;
RUN mkdir /src/drf_firebase_auth;
ADD ./requirements.txt /src/requirements.txt
RUN pip install -r ./src/requirements.txt
ADD . /src
COPY ./supporting_libraries/drf-firebase-auth/drf_firebase_auth /src/drf_firebase_auth
COPY ./backup /src/backup
WORKDIR /src
RUN python manage.py collectstatic --no-input
