#!/bin/sh
docker build . -f docker/Dockerfile -t bookbnb-react --build-arg REACT_APP_BACKEND_URL=$BACKEND_URL
