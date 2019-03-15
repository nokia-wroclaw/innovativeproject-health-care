FROM node:latest
WORKDIR /srv/www/frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
RUN rm -f /etc/nginx/conf.d/default.conf
COPY --from=0 /srv/www/frontend /srv/www/frontend
EXPOSE 80
