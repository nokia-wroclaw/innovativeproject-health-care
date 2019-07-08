FROM node:11
WORKDIR /srv/www/frontend
COPY ./frontend .
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=0 /srv/www/frontend/build /srv/www/frontend
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
