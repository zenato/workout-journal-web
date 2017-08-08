FROM node:8

COPY . /app

RUN cd /app; npm install

EXPOSE 3000

WORKDIR /app

CMD npm run start
