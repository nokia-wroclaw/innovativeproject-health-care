FROM nginx:latest
EXPOSE 80
EXPOSE 5000
#RUN rm /etc/nginx/conf.d/default.conf
COPY backend.conf /etc/nginx/conf.d/
COPY frontend.conf /etc/nginx/conf.d/
