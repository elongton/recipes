FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /src;
RUN mkdir /src/mediafiles;
RUN mkdir /src/backup;
ADD ./requirements.txt /src/requirements.txt
RUN pip install -r ./src/requirements.txt
ADD . /src
WORKDIR /src
RUN python manage.py collectstatic