FROM node:14 as build

WORKDIR /axios-code

RUN mkdir ~/.npm-global && \
	npm config set prefix ~/.npm-global

RUN yarn config set prefix ~/.yarn

RUN npm i -g yarn

RUN yarn global add axios --unsafe-perm --ignore-scripts

FROM nginx:1.19.2-alpine

ARG SOURCE_MAP_SECRET
ENV SOURCE_MAP_SECRET=$SOURCE_MAP_SECRET

RUN ["apk", "update"]
RUN ["apk", "add", "vim"]

COPY --from=build /usr/local/share/.config/yarn/global/node_modules/axios /usr/share/nginx/html/axios
COPY ./static /usr/share/nginx/html

COPY ./nginx/default.conf /nginx.conf.template
CMD ["/bin/sh" , "-c" , "envsubst '$SOURCE_MAP_SECRET' < /nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]

EXPOSE 80