#! /bin/bash

DB_USER=yatlab
DB_NAME=yatlab-dev
# export the .env environment variables to the shell
export $(egrep -v '^#' .env | xargs)

# Create the database
psql postgres -c "DROP DATABASE IF EXISTS \"$DB_NAME\";"
psql postgres -c "CREATE DATABASE \"$DB_NAME\"";

# Create the DB user
psql postgres -c "DROP ROLE IF EXISTS \"$DB_USER\";"
psql postgres -c "CREATE ROLE \"$DB_USER\" WITH LOGIN PASSWORD '$DB_PASS'"

# Add the DB user to the newly created table
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE \"$DB_NAME\" TO \"$DB_USER\""
