const express = require('express');
const app = express();
const fetch = require('node-fetch');

const PORT = 8080;
const txt = "ping";

app.get('/5372', (req,res) => {
  res.send("4567");
})

app.get('/4567', (req,res) => {
  res.send("5372");
})

app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:%s", PORT);
})

