FROM node:lts-alpine3.11 as builder

WORKDIR /usr/builder/feelback

COPY . .

RUN apk add --no-cache -t build-dependencies make gcc g++ python libtool autoconf automake 
RUN npm install -g node-gyp 
RUN npm install 
RUN apk del build-dependencies

RUN npm run prebuild
RUN npm run build feelback-api

# -----------------------------------------------

FROM node:lts-alpine3.11 as production

WORKDIR /usr/production/feelback

RUN npm install -g pm2

COPY ./.env ./.env
COPY --from=builder /usr/builder/feelback/dist/apps/feelback-api .
COPY --from=builder /usr/builder/feelback/node_modules ./node_modules

CMD ["pm2-runtime", "./main.js"]
