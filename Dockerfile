# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app

COPY .env ./
COPY ["package.json", "package-lock.json*", "./"]

RUN npm i typescript -g
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]
