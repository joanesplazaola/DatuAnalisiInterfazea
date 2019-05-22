#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER proiektua_web_react WITH PASSWORD 'password' CREATEDB;
    CREATE DATABASE proiektua_web_react;
    GRANT ALL PRIVILEGES ON DATABASE proiektua_web_react TO proiektua_web_react;
EOSQL
