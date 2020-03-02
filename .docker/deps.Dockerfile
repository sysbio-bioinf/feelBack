FROM cancerlog.core:latest as builder

LABEL maintainer="Johannes Schobel <johannes.schobel@uni-ulm.de>"

WORKDIR /usr/builder/feelback

COPY . .

RUN npm install -g node-gyp 
RUN npm ci
