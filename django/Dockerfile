FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /src;
RUN mkdir /src/mediafiles;
ADD ./requirements.txt /src/requirements.txt
RUN pip install -r ./src/requirements.txt
ADD . /src
ADD ./backup /src/backup
WORKDIR /src
RUN python manage.py collectstatic