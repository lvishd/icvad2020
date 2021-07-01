const express = require('express');
const app = express();
const fetch = require('node-fetch');

const PORT = 5372;
const txt = "pong";
let URL2fetch = null;
// const URL2fetch = "http://localhost:4567";


async function getURL(){
  const url = 'http://localhost:8080/' + PORT ;
  URL2fetch = 'http://localhost:' + await fetch(url).then(res => res.text())
  console.log("fetched: " + URL2fetch);
}

async function pingPong(){
  if (URL2fetch == null){
    await getURL();
  }

  fetch(URL2fetch)
      .then(res => res.text())
      .then(text => console.log(text))
}

app.get('/', (req,res) => {
  res.send(txt);
  setTimeout(pingPong, 500);
})

app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:%s", PORT);
})



pingPong();