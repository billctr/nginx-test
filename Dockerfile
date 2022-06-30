FROM node:14 as build

WORKDIR /application

RUN ["npm", "install", "git+https://github.com/billctr/nginx-test.git"]

FROM nginx:1.19.2-alpine

ARG SOURCE_MAP_SECRET
ENV SOURCE_MAP_SECRET=$SOURCE_MAP_SECRET

RUN ["apk", "update"]
RUN ["apk", "add", "vim"]

COPY --from=build /application/node_modules/nginx-test/dist /usr/share/nginx/html

COPY ./config/nginx/default.conf /nginx.conf.template
CMD ["/bin/sh" , "-c" , "envsubst '$SOURCE_MAP_SECRET' < /nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]

EXPOSE 80