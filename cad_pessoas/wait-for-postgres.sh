#!/bin/bash
# wait-for-postgres.sh

set -e

host="db"
port="5432"
shift 2
cmd="$@"

until PGPASSWORD="jensix123" psql -h "$host" -U "postgres" -p "$port" -c '\l'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd
