FROM node:lts-alpine3.11 as builder

LABEL maintainer="Johannes Schobel <johannes.schobel@uni-ulm.de>"

WORKDIR /usr/builder/feelback

RUN apk add --no-cache -t build-dependencies make gcc g++ python libtool autoconf automake
