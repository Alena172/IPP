# Укажите базовый образ Node.js
FROM node:20

# Установите рабочую директорию
WORKDIR /usr/src/app

# Копируйте package.json и package-lock.json для бэкенда
COPY backend/package*.json ./backend/

# Установите зависимости бэкенда
RUN npm install --prefix ./backend

# Копируйте код бэкенда
COPY backend ./backend

# Копируйте package.json и package-lock.json для фронтенда
COPY frontend/package*.json ./frontend/

# Установите зависимости фронтенда
RUN npm install --prefix ./frontend

# Копируйте код фронтенда
COPY frontend ./frontend

# Соберите фронтенд
RUN npm run build --prefix ./frontend

# Укажите порт, который будет использоваться
EXPOSE 3000

# Команда для запуска вашего бэкенда
CMD ["node", "./backend/app.js"]
