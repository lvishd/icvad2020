FROM node:14
WORKDIR /usr/src/app
COPY package*.json server1.js ./
RUN npm install
EXPOSE 4567
CMD ["node", "server1.js"]