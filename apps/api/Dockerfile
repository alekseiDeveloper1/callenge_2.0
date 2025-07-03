# Используем официальный образ Node.js
FROM node:20-alpine AS base

# Этап сборки
FROM base AS builder
# Устанавливаем зависимости для Alpine
RUN apk update
RUN apk add --no-cache libc6-compat git openssl python3 make g++
WORKDIR /app
# 1. Копируем только необходимые файлы для установки зависимостей
COPY package.json package-lock.json turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/api/prisma ./apps/api/prisma/

# 2. Устанавливаем зависимости
RUN npm install turbo --global
RUN npm install turbo
COPY . .
RUN turbo prune api --docker

# Этап установки
FROM base AS installer
WORKDIR /app

# 3. Копируем файлы зависимостей
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json

# 4. Устанавливаем зависимости (включая devDependencies для сборки)
RUN npm install --global npm@latest && \
    npm install --include=dev

# 5. Копируем остальные файлы проекта
COPY --from=builder /app/out/full/ .

# 6. Генерируем Prisma клиент
RUN npx prisma generate --schema=./apps/api/prisma/schema.prisma

# 7. Собираем NestJS приложение
#npx turbo run build --filter=api...
RUN npx turbo build
# Финальный образ
FROM base AS runner
WORKDIR /app

# 8. Копируем только необходимые файлы
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/api/dist ./apps/api/dist
COPY --from=installer /app/apps/api/prisma ./apps/api/prisma

# 9. Устанавливаем non-root пользователя
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs
USER nestjs
# Скрипт для миграций и запуска
COPY --chmod=+x entrypoint.sh /app/entrypoint.sh
CMD ["sh", "-c", "sleep 5"]

EXPOSE 3000
CMD ["./entrypoint.sh"]