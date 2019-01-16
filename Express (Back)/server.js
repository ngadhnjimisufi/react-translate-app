require('dotenv/config');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');

app.use(bodyparser.json());
app.use(cors());

const {Translate} = require('@google-cloud/translate');
const translate = new Translate();

app.get('/getSupportedLanguages',(req,res)=>{
  translate.getLanguages().then(results=>{
    res.send(results[0]);
  })
});

app.post('/translate', (req, res) => {
  const text = req.body.text;
  const target = req.body.to;

  translate
    .translate(text, target)
    .then(results => {
      const translation = results[0];

      res.send({ 'text': translation });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
