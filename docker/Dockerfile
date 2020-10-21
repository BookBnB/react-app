FROM node:14.1-alpine

COPY . /app
WORKDIR /app
RUN npm install --only=prod && \
    npm run build && \
    rm -R docker src public
CMD npm start
