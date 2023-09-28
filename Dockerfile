FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm i --global pnpm

RUN pnpm i
RUN pnpm run build

CMD [ "node", "--stack-size=9000", "./dist/index.js" ]
