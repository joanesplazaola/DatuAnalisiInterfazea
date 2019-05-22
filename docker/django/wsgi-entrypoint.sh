#!/bin/bash

until cd ./
do
    echo "Waiting for server volume..."
done

until python manage.py migrate --settings=proiektua_web_react.settings
do
    echo "Waiting for postgres ready..."
    sleep 2
done

./manage.py collectstatic --noinput

gunicorn proiektua_web_react.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4
#./manage.py runserver 0.0.0.0:8000 # --settings=settings.dev_docker
