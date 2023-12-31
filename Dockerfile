# syntax=docker/dockerfile:1

FROM node:18-alpine as builder

WORKDIR /app

COPY .env ./
COPY ["package.json", "package-lock.json*", "./"]

# RUN npm i typescript -g
RUN npm install

COPY . .

RUN npm run build

FROM nginx
COPY --from=builder app/build /usr/share/nginx/html
COPY --from=builder app/nginx/conf /etc/nginx/conf.d
COPY --from=builder app/nginx/root /etc/nginx

CMD ["nginx", "-g", "daemon off;"]
