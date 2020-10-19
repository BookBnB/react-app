#!/bin/bash
echo "Paso 1"
docker build . -f docker/Dockerfile -t bookbnb-react
echo "Paso 2"
docker tag bookbnb-react:latest registry.heroku.com/bookbnb-react-master/web
echo "Paso 3"
echo "956e667e-2fe5-462c-86f0-3e899bb42f48" | docker login --username=_ --password-stdin registry.heroku.com
echo "Paso 4"
docker push registry.heroku.com/bookbnb-react/web
echo "Paso 5"
curl https://cli-assets.heroku.com/install.sh | sh  #install heroku
echo "Paso 6"
heroku container:release web -a bookbnb-react