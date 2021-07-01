FROM node:14
WORKDIR /usr/src/app
COPY package*.json server5372.js ./
RUN npm install
EXPOSE 5372
CMD ["node", "server5372.js"]