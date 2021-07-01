FROM node:14
WORKDIR /usr/src/app
COPY package*.json server8080.js ./
RUN npm install
EXPOSE 8080
CMD ["node", "server8080.js"]