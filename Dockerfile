FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./yarn.lock

COPY dist ./dist
COPY ./files ./files
COPY ./runner.js ./runner.js

CMD [ "node", "runner.js", "./files/fib.json" ]
