// const path        = require('path');
require("cross-fetch/polyfill");
require("isomorphic-form-data");
const express     = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const db          = require('./database-config/db');

const app = express();
const { UserSession } = require("@esri/arcgis-rest-auth");
const { clientId } = require("./config.json");
// const { SearchQueryBuilder, searchItems } = require("@esri/arcgis-rest-portal");
const { request } = require("@esri/arcgis-rest-request")
const port = 9000;

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);
  //console.log(database)
  
const credentials = {
  clientId,
  redirectUri: `http://localhost:${port}/logged-in`
};

app.get("/", function(req, res) {
  UserSession.authorize(credentials, res);
});

app.get("/logged-in", function(req, res) {
  if (credentials) {
    UserSession.exchangeAuthorizationCode(
      credentials,
      req.query.code
    ).then(session => {
      // res.send(session);
      request(`https://arcgis.com/sharing/rest/content/users/${session.username}/`, {
        httpMethod: "POST",
        params: {"owner": session.username, "token": session.token}
      }).then((response) => {
        // console.log(response.items);
        database.db().collection("user-items").deleteMany({});
        database.db().collection("user-items").insertMany(response.items);
        response.items.forEach(item => {
          console.log(item.title);
        });

      }).catch((err) => {
        console.log(err);
      });
      return res.redirect('/home');
    });
  } else {
    res.send("please visit http://localhost:3000/authorize");
  }
});

// app.get("/home", function(req, res) {
//     res.send(app.use(express.static('public')));
// })

app.use(bodyParser.urlencoded({ extended: true }));


  
  require('./app/routes')(app, database);
  app.use(express.static('./public'));
  app.listen(port, () => {
    console.log("Live on localhost:" + port);
  });
});
