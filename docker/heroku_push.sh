#!/bin/bash
docker build . -f docker/Dockerfile -t bookbnb-react --build-arg REACT_APP_BACKEND_URL=https://bookbnb-$TRAVIS_BRANCH.herokuapp.com
docker tag bookbnb-react:latest registry.heroku.com/bookbnb-react-$TRAVIS_BRANCH/web
echo "$HEROKU_API_KEY" | docker login --username=_ --password-stdin registry.heroku.com
docker push registry.heroku.com/bookbnb-react-$TRAVIS_BRANCH/web
curl https://cli-assets.heroku.com/install.sh | sh  #install heroku
heroku container:release web -a bookbnb-react-$TRAVIS_BRANCH
