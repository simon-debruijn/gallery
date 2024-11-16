#!/bin/sh

# Wait until PostgreSQL is ready
until pg_isready -h db -p 5432; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done

npm run db migrate || exit 1;
exec npm run app:start || exit 1;