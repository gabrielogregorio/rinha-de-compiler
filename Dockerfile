FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./yarn.lock

COPY ./dist ./dist
COPY ./files ./files


CMD [ "node", "./dist/runner.js", "./files/combination.json" ]
