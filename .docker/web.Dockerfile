FROM node:13.3.0 AS compile-image

WORKDIR /opt/ng
COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH" 

COPY . ./
RUN ng build feelback-web --prod
RUN gzip ./dist/apps/**/*.js

FROM nginx

COPY --from=compile-image /opt/ng/dist/apps/feelback-web /usr/share/nginx/html/dist
COPY --from=compile-image /opt/ng/dist/apps/feelback-web /var/www/html/dist
COPY ./apps/feelback-web/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]