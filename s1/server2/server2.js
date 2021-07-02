const express = require('express');
const app = express();
const fetch = require('node-fetch');

const PORT = 5372;
const target = "s1";
const txt = "pong";
const URL_s3 = 'http://172.26.48.1:8080';
let URL_s4 = null;


async function getURL(){
  URL_s4 = 'http://172.26.48.1:' + await fetch(URL_s3+"/broker").then(res => res.text());
  console.log("fetched: " + URL_s4);
}

async function pingPong(){
  if (URL_s4 == null){
    await getURL();
  }

  fetch(URL_s4 + "?dest="+target)
      .then(res => res.text())
      .then(text => console.log(text))
}

app.get('/', (req,res) => {
  res.send(txt);
  setTimeout(pingPong, 500);
})

app.listen(PORT, () => {
  console.log("Server listening on: http://172.26.48.1:%s", PORT);
})



pingPong();