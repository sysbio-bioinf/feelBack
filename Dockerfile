# Dockerfile to build UI and API
# This file follows the multistage approach.

# -----------------------------------------------
# DEPENDENCY Container
# -----------------------------------------------
FROM node:lts-alpine3.11 AS dependencies
WORKDIR /app

RUN apk add -t build-dependencies make gcc g++ python libtool autoconf automake

RUN npm install -g node-gyp 

COPY ./package.json .
COPY ./package-lock.json .
# --unsafe-perm is required to run ngcc in the postinstall
RUN npm ci --unsafe-perm

# -----------------------------------------------
# BUILD Container
# -----------------------------------------------
FROM dependencies AS build
WORKDIR /app
COPY . .

# now we build the applications
RUN npx ng build feelback-web --prod
RUN npx ng build feelback-api --prod

# -----------------------------------------------
# WEB SERVER Container
# -----------------------------------------------
FROM nginx:1.17.10-alpine AS feelback-web
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/apps/feelback-web .

RUN gzip /usr/share/nginx/html/*.js

# copy configuration for server
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/web.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

# -----------------------------------------------
# API Container
# -----------------------------------------------
FROM dependencies AS feelback-api
WORKDIR /app

# now copy the application
COPY --from=build /app/dist/apps/feelback-api .

# TODO can we improve this?
COPY ./.env ./.env

CMD ["node", "main"]

EXPOSE 3000/tcp

