const express = require('express');
const app = express();
const fetch = require('node-fetch');

const PORT = 1111;
const name = "s4";
const URL_s3 = 'http://172.26.48.1:8080';
const LOCALHOST = "http://172.26.48.1";

let URLs = {
  "s1":"",
  "s2":"",
};

// I am the message broker


async function getURLs(){
  const res = await Promise.all(Object.keys(URLs).map(async key => {
    let port = await fetch(URL_s3+'/'+key).then(res => res.text());
    URLs[key] = LOCALHOST +':'+ port ;
    console.log("fetched: " + URLs[key]);
  }));
  console.log("fetched all client's URLs");
}


app.get('/', (req,res) => {
  let dest = req.query.dest;

  fetch(URLs[dest])
      .then(res => res.text())
      .then(text => console.log(text))

  res.send("I poked " + dest);
})

app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:%s", PORT);
})

getURLs();