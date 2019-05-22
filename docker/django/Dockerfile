FROM python:3.6
MAINTAINER Filipe Garcia <filipe.garcia@seedstarslabs.com>

ENV PYTHONUNBUFFERED 1

COPY ./docker/django/django-entrypoint.sh /
COPY ./py-requirements /django/py-requirements

WORKDIR /django

RUN pip install pip
RUN pip install -r py-requirements/base.txt
