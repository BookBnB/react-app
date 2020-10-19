#!/bin/bash
./docker/build_production_image.sh
docker tag bookbnb-react:latest registry.heroku.com/bookbnb-react-master/web
echo "$HEROKU_API_KEY" | docker login --username=_ --password-stdin registry.heroku.com
docker push registry.heroku.com/nameless-springs-01824/web
curl https://cli-assets.heroku.com/install.sh | sh  #install heroku
heroku container:release web -a bookbnb-react