FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm i --global pnpm

RUN pnpm i
RUN pnpm run build

CMD [ "node", "./dist/index.js" ]
