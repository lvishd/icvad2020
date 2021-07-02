FROM node:14
WORKDIR /usr/src/app
COPY package*.json server3.js ./
RUN npm install
EXPOSE 8080
CMD ["node", "server3.js"]