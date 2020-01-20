docker rm nginx_web_1
docker image build -t nginx_recipes .
REM docker container run --publish 80:80 --detach --name recipe_server nginx_recipes:latest
docker-compose -f docker-compose.yml up --build