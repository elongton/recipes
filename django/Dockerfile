FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /src;
ADD ./requirements.txt /src/requirements.txt
RUN pip install -r ./src/requirements.txt
ADD . /src
WORKDIR /src