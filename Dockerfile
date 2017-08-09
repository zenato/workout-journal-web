FROM node:8

COPY . /app

RUN cd /app && npm install && npm run build && npm run build:server

EXPOSE 3001

WORKDIR /app

CMD npm run start:server
