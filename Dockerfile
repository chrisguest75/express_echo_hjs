#FROM node:12.13-alpine as prod
FROM node:12.14.0-buster-slim as prod 
ENV DEBUG=app:*

RUN apt update && apt install cgroup-bin -y

WORKDIR /app
COPY ./bin bin
COPY ./public public
COPY ./handlers handlers
COPY ./routes routes
COPY ./views views
COPY .env .env
COPY app.js app.js
COPY package.json package.json 
COPY package-lock.json package-lock.json 
RUN npm install --only=production
COPY start.sh /scripts/start.sh
CMD ["/scripts/start.sh", "start"]

# Add test layers
FROM prod as unittest

WORKDIR /app
COPY ./tests tests
RUN npm install --only=dev
CMD ["/scripts/start.sh", "test"]

# Add cypress test layers
FROM unittest as integrationtest

RUN apt update && apt-get install xvfb libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 -y
WORKDIR /app
COPY ./cypress cypress
COPY ./cypress.json cypress.json
CMD ["/app/cypress/run_cypress.sh"]