FROM node:8.11.3

RUN mkdir /node_server

RUN npm install -g pm2

COPY . ./node_server

RUN rm -rf /node_server/node_modules
RUN cd /node_server && npm install && npm run build
WORKDIR /node_server
CMD ["pm2-docker", "start", "pm2.json"]
