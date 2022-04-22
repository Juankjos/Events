FROM node:alpine3.13

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon 

COPY . .

CMD [ "node", "app.js" ]