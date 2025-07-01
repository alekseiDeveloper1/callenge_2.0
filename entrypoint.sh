#!/bin/sh
set -e

# Ждем готовности PostgreSQL
#echo "Waiting for PostgreSQL to be ready..."
#timeout 60 sh -c 'until pg_isready -h postgres -U postgres -d challenge_1.0; do sleep 2; echo "Retrying..."; done'
# Применяем миграции
echo "Running database migrations..."
npx prisma migrate deploy --schema=./apps/api/prisma/schema.prisma

# Запускаем приложение
echo "Starting application..."
exec node apps/api/dist/src/main.js