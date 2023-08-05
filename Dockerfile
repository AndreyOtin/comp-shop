# syntax=docker/dockerfile:1

FROM node:alpine as builder

WORKDIR /app

COPY .env ./
COPY ["package.json", "package-lock.json*", "./"]

RUN npm i typescript -g
RUN npm install

COPY . .

RUN npm run build

from nginx
COPY --from=builder app/build /usr/share/nginx/html
