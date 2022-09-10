#!/bin/bash

# Immediately exits if any error occurs during the script
# execution. If not set, an error could occur and the
# script would continue its execution.
set -o errexit


# Creating an array that defines the environment variables
# that must be set. This can be consumed later via array
# variable expansion ${REQUIRED_ENV_VARS[@]}.
readonly REQUIRED_ENV_VARS=(
  "DATABASE_USER"
  "DATABASE_PASSWORD"
  "DATABASE_NAME"
  "POSTGRES_USER")


# Main execution:
# - verifies if all environment variables are set
# - runs the SQL code to create user and database
main() {
  check_env_vars_set
  init_user_and_db
  create_schemas
}


# Checks if all of the required environment
# variables are set. If one of them isn't,
# echoes a text explaining which one isn't
# and the name of the ones that need to be
check_env_vars_set() {
  for required_env_var in "${REQUIRED_ENV_VARS[@]}"; do
    if [[ -z "${!required_env_var}" ]]; then
      printf "Error: Environment variable $required_env_var not set.
      Make sure you have the following environment variables set: %s . Aborting." "${REQUIRED_ENV_VARS[@]}"
      exit 1
    fi
  done
}


# Performs the initialization in the already-started PostgreSQL
# using the preconfigured POSTGRE_USER user.
init_user_and_db() {
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
     CREATE USER "$DATABASE_USER" WITH PASSWORD '$DATABASE_PASSWORD';
     CREATE DATABASE "$DATABASE_NAME";
     GRANT ALL PRIVILEGES ON DATABASE "$DATABASE_NAME" TO "$DATABASE_USER";
EOSQL
}

create_schemas() {
  psql "$DATABASE_NAME" -v ON_ERROR_STOP=1 --username "$DATABASE_USER" <<-EOSQL

EOSQL
}

# Executes the main routine with environment variables
# passed through the command line. We don't use them in
# this script but now you know 🤓
main "$@"
