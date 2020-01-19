FROM nginx

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "nano"]

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY conf/recipes.conf /etc/nginx/sites-available/recipes

RUN ["mkdir", "/etc/nginx/sites-enabled"]
RUN ["ln", "-s", "/etc/nginx/sites_available/recipes", "/etc/nginx/sites-enabled/"]