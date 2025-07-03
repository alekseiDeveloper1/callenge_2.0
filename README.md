
## Установка зависимостей:
В корне проекта
npm install turbo --global
npm install

## Создайте .env файлы в корне проекта, apps/web и apps/api.
Например:
./
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/challenge_1.0?schema=public"
JWT_SECRET=""
JWT_REFRESH_SECRET=""

apps/web
.env.local
API_URL = 'http://localhost:3000'
port=3001

.env.production
NEXT_PUBLIC_API_URL=http://localhost:3000
port=3001
JWT_SECRET="proto"
JWT_REFRESH_SECRET="proto_r"

apps/api
DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/challenge_1.0?schema=public
JWT_SECRET="proto"
JWT_REFRESH_SECRET="proto_r"

# Локально
apps/api/prisma
prisma generate

## в корне проекта
npm run dev

# Докер

в корне проекта
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d

Откройте:
Frontend: http://localhost:3000