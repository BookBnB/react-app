#!/bin/bash
docker pull $IMAGE_NAME:$IMAGE_VERSION
docker tag $IMAGE_NAME:$IMAGE_VERSION registry.heroku.com/bookbnb-react-$BRANCH/web
echo "$HEROKU_API_KEY" | docker login --username=_ --password-stdin registry.heroku.com
docker push registry.heroku.com/bookbnb-react-$BRANCH/web
curl https://cli-assets.heroku.com/install.sh | sh  # install heroku
heroku container:release web -a bookbnb-react-$BRANCH
