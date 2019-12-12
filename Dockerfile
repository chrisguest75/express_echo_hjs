FROM node:12.13-alpine as prod

ENV DEBUG=app:*

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
RUN npm install

CMD ["npm", "start"]

# Add test layers
FROM node:12.13-alpine as test

WORKDIR /app
COPY --from=prod /app /app
COPY ./tests tests

CMD ["npm", "test"]

