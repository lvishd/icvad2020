FROM node:14
WORKDIR /usr/src/app
COPY package*.json server4567.js ./
RUN npm install
EXPOSE 4567
CMD ["node", "server4567.js"]