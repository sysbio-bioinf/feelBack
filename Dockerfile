# Dockerfile to build UI and API
# This file follows the multistage approach.

# -----------------------------------------------
# DEPENDENCY Container
# -----------------------------------------------
FROM node:13.10.1 AS dependencies
WORKDIR /app
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

# -----------------------------------------------
# WEB SERVER Container
# -----------------------------------------------
FROM nginx:1.17.10-alpine AS feelback-web
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/apps/feelback-web .

# copy configuration for server
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/web.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp
