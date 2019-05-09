FROM node:latest
WORKDIR /srv/www/frontend
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend .
RUN npm run build

FROM nginx:latest
COPY --from=0 /srv/www/frontend/build /srv/www/frontend
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
