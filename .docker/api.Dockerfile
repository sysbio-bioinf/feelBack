FROM cancerlog.deps:latest as builder

LABEL maintainer="Johannes Schobel <johannes.schobel@uni-ulm.de>"

WORKDIR /usr/builder/feelback

RUN npm run prebuild
RUN npm run build feelback-api

# -----------------------------------------------

#FROM cancerlog.deps:latest as production
#
#WORKDIR /usr/builder/feelback
#
RUN npm install -g pm2

COPY ./.env ./.env
#COPY --from=builder /usr/builder/feelback/dist/apps/feelback-api .
#COPY --from=builder /usr/builder/feelback/node_modules ./node_modules

#CMD ["pm2-runtime", "./main.js"]

CMD ["pm2-runtime", "/usr/builder/feelback/dist/apps/feelback-api/main.js"]