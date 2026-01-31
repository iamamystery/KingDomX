FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build || true
EXPOSE 4000
CMD ["npm", "run", "dev"]
