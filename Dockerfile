FROM node:18.15.0

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json .

RUN npm install

COPY . .

CMD ["node", "server.js"]

EXPOSE 3000