# commands
docker-compose -f docker-compose.yml up --build

## run dockerfile alone
docker image build -t <image_name> .
docker container run --publish 80:80 --detach --name <container_name> <image_name>

## enter the container
docker container exec -it <container_name> /bin/sh


## build dockerfile and push to dockerhub


## create symlinks

Windows:
mklink /J C:\Users\Max\Documents\code\recipes\django\drf_firebase_auth C:\Users\Max\Documents\code\recipes\django\supporting_libraries\drf-firebase-auth\drf_firebase_auth

### stuff to come:

1. Flavor ties - the app will find common flavors and pair them up with a roulette wheel
