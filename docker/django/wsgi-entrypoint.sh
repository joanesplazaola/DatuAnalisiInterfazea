#!/bin/bash


until cd ./
do
    echo "Waiting for server volume..."
done
python manage.py makemigrations backend
python manage.py makemigrations frontend
python manage.py makemigrations accounts

until python manage.py migrate --settings=proiektua_web_react.settings
do
    echo "Waiting for postgres ready..."
    sleep 2
done

python manage.py loaddata fixtures.json --settings=proiektua_web_react.settings
python manage.py collectstatic --noinput
gunicorn proiektua_web_react.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4
