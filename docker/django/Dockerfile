FROM python:3.6
MAINTAINER Filipe Garcia <filipe.garcia@seedstarslabs.com>

ENV PYTHONUNBUFFERED 1

COPY ./docker/django/asgi-entrypoint.sh /asgi-entrypoint.sh
COPY requirements.txt /django/

WORKDIR /django

RUN chmod +x /asgi-entrypoint.sh
ENTRYPOINT ["/asgi-entrypoint.sh"]

RUN pip install pip
RUN pip install -r requirements.txt
