# Установим базовый образ
FROM node:20

# Установим рабочую директорию
WORKDIR /usr/src/app

# Скопируем package.json и package-lock.json для backend и frontend
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Установим зависимости для обоих приложений
RUN cd backend && npm install
RUN cd frontend && npm install

# Скопируем все файлы в контейнер
COPY . .

# Сборка Angular приложения
RUN cd frontend && npm run build

# Установим переменную окружения для порта
ENV PORT=3000

# Команда для запуска бэкенда
CMD ["sh", "-c", "node backend/app.js & serve -s frontend/dist/frontend -l 3000"]
