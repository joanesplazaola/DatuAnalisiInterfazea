FROM python:3.6
MAINTAINER Filipe Garcia <filipe.garcia@seedstarslabs.com>

ENV PYTHONUNBUFFERED 1

COPY ./docker/worker/worker-entrypoint.sh /worker-entrypoint.sh
COPY requirements.txt /django/

WORKDIR /django

RUN chmod +x /worker-entrypoint.sh
ENTRYPOINT ["/worker-entrypoint.sh"]

RUN pip install pip
RUN pip install -r requirements.txt
