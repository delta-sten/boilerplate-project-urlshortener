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

  //console.log(req.baseUrl);
  /*
  var cache = [];
  let stringifiedReq = window.JSON.stringify(circ, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      // Duplicate reference found, discard key
      if (cache.includes(value)) return;

      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  cache = null; // Enable garbage collection
  console.log(stringifiedReq);
  */
  const { url } = req.body;

  console.log('URL: ' + url);
  console.log('req.body: ' + req.body);
  //console.log('req.get(host): ' + req.get('host'));
  //console.log('req.originalUrl: ' + req.originalUrl);

  let responseOriginal = req.baseUrl;
  res.json({
    original_url: url,
    short_url: 1
  })
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
