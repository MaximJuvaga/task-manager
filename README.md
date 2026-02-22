# Task Manager
системы управления задачами с аутентификацией пользователей.

## технологии (на данный момент)
Express 
PostgreSQL 
Prisma 
JWT 
bcryptjs 

## реализованные фичи
Регистрация и аутентификация пользователей через JWT
Валидация входных данных
Хеширование паролей
PostgreSQL(пока что одна таблица пользователей)
Prisma ORM
Логирование запросов
Обработка ошибок

## для старта
Клонирование:
git clone https://github.com/MaximJuvaga/task-manager.git
cd task-manager/backend

Установка зависимостей:
npm install

Настройка .env:
cp .env.example .env
Заполните DATABASE_URL и JWT_SECRET

Запуск:
npm run dev
