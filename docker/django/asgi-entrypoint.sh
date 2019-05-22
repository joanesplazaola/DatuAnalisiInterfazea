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

python manage.py loaddata fixtures.json --settings=proiektua_web_react.settings
daphne proiektua_web_react.asgi:application --bind 0.0.0.0 --port 8000
