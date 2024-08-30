FROM node:20

RUN mkdir app

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

COPY ./api/public ./dist/api/public

EXPOSE 3000

CMD ["yarn", "start"]
