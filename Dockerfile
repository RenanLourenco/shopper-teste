FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x api-start-docker.sh

EXPOSE 3000


CMD ["./api-start-docker.sh"]
