FROM node:20-alpine

WORKDIR /app

COPY . /app

RUN yarn
RUN yarn build

CMD [ "node", "./dist/runner.js", "./files/combination.json" ]
