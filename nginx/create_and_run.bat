docker stop recipe_server
docker rm recipe_server
docker image build -t nginx_recipes .
REM docker container run --publish 80:80 --detach --name recipe_server nginx_recipes:latest
docker-compose -f docker-compose.yml up --build