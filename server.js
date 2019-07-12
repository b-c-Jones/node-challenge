const path        = require('path');
const express     = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const db          = require('./config/db');

const app = express();

const port = 9000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);
  app.use(express.static('public'));
  require('./app/routes')(app, database);
  
  app.listen(port, () => {
    console.log("Live on localhost:" + port);
  });
});