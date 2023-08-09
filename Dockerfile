# syntax=docker/dockerfile:1

FROM node:18-alpine as builder

WORKDIR /app

COPY .env ./
COPY ["package.json", "package-lock.json*", "./"]

# RUN npm i typescript -g
RUN npm install

COPY . .

RUN npm run build

FROM ubuntu/nginx
COPY --from=builder app/build /usr/share/nginx/html
COPY --from=builder app/nginx /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
