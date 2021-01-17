FROM node:latest

RUN mkdir -p /usr/apicoffeeshop

WORKDIR /usr/apicoffeeshop

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8888

CMD [ "node", "app.js" ]