FROM node:14
WORKDIR /usr/src/app
COPY package*.json main.js ./
RUN npm install
EXPOSE 8080
CMD ["node", "main.js"]