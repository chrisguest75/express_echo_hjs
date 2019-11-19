FROM node:12.13-alpine

ENV DEBUG=app:*

WORKDIR /app
COPY ./bin bin
COPY ./public public
COPY ./routes routes
COPY ./views views
COPY .env .env
COPY app.js app.js
COPY package.json package.json 
COPY package-lock.json package-lock.json 
RUN npm install

CMD ["npm", "start"]


