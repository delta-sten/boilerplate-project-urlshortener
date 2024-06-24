require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/shorturl', (req, res) => {
/*
  let randomNumber = Math.random().toString();
  randomNumber = randomNumber.substring(2, randomNumber.length);
  res.cookie("apikey", randomNumber, {maxAge: 900000, httpOnly: true});
  */

  const { url } = req.body;

  console.log('URL: ' + url);
  console.log('req.body: ' + req.body);

  //let responseOriginal = req.baseUrl;
  res.json({
    original_url: url,
    short_url: 1
  })
});

app.get('/api/shorturl/', (req, res) => {
  //let apikey = req.cookies.apikey;

});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});




//username: stenschmidt
//password: cH7j5cQElHtp8EbX

