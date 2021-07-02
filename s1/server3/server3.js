const express = require('express');
const app = express();
const fetch = require('node-fetch');

const PORT = 8080;
const txt = "ping";

const PORTS = {
  "s1": "4567",
  "s2": "5372",
  "s4": "1111"
};

// I am the keys holder


app.get('/s1', (req, res) => {
  res.send(PORTS["s1"]);
})

app.get('/s2', (req, res) => {
  res.send(PORTS["s2"]);
})

app.get('/broker', (req, res) => {
  res.send(PORTS["s4"]);
})



app.listen(PORT, () => {
  console.log("Server listening on: http://172.26.48.1:%s", PORT);
})

