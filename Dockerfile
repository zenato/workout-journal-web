FROM node

RUN npm install -g yarn

COPY . /app

RUN cd /app && yarn && yarn run build && yarn run build:server

EXPOSE 3001

WORKDIR /app

CMD yarn run start:server
