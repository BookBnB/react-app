FROM node:14.1-alpine
ARG REACT_APP_BACKEND_URL
COPY . /app
WORKDIR /app
RUN npm install --only=prod
CMD npm start
