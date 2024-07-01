require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Schema } = mongoose;
//import { useEffect } from "react";

mongoose.connect(process.env.MONGO_URI);


let entry;
const urlSchema = new Schema({
  original_url: String,
  short_url: Number
});
entry = mongoose.model("entry", urlSchema);


/*
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/

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

function getURL(url) {
  entry.findOne({short_url: url}, )
};

app.post('/api/shorturl', async (req, res) => {
/*
  let randomNumber = Math.random().toString();
  randomNumber = randomNumber.substring(2, randomNumber.length);
  res.cookie("apikey", randomNumber, {maxAge: 900000, httpOnly: true});
  */

  const { url } = req.body;
/*
  useEffect(() => {
    let queryString = null;
    if (typeof window !== "undefined") {
      queryString = window.location.search;
      console.log('queryString: ' + queryString);
    }
  }, []);
  */
 //console.log(req);

  //console.log('URL: ' + url);
  //console.log('req.body: ' + req.body);
  let shortUrlNum = Math.floor(Math.random() * 100000);
  let newEntry = new entry({original_url: url, short_url: shortUrlNum});

  try {
    const user = await newEntry.save();
    res.json(user);
  } catch(err) {
    console.log(err);
  }

});



app.get("/api/shorturl/:hash", async (req, res) => {
  console.log("app.get(/:hash, works");
  if (req.params.hash !== undefined) {
    let inputNum = Number(req.params.hash);
    let URLentries = await entry.find({ short_url: inputNum}).exec();
    console.log('actual URL: ' + URLentries);
    res.redirect(URLentries.original_url);
  }
  res.sendStatus(404);
  
  //window.location.href = actualURL
  //res.send(window.location.href);
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});




//username: stenschmidt
//password: cH7j5cQElHtp8EbX

