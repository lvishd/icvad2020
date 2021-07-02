FROM node:14
WORKDIR /usr/src/app
COPY package*.json server2.js ./
RUN npm install
EXPOSE 5372
CMD ["node", "server2.js"]