FROM node:14
WORKDIR /usr/src/app
COPY package*.json server4.js ./
RUN npm install
EXPOSE 1111
CMD ["node", "server4.js"]