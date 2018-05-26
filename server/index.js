const express = require('express');
const db = require('../database/index.js');
const request = require('request');
const helpers = require('../helpers/github.js')
var bodyParser = require('body-parser');
var cors = require('cors');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());
app.use(bodyParser.json());

var currOwner = '';
app.post('/repos', function (req, res, next) {
  currOwner = req.body.term;
  if (currOwner.length > 0) {
    db.Repo.find({owner: currOwner}, function(err, data) {
      if (err) {
        res.status(500).send();
      } else {
        if (data.length <= 0) {
          helpers.getReposByUsername(currOwner, (data) => {
            db.Repo.create(data, function(err, data) {
              if (err) {
                console.log(err);
              } else {
                res.status(201).send();
              }
            })
          });
        }
      }
    });
  } else {
    res.status(400).send();
  }
 });


app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos

///////////////////////РАБОТАЕТ НА МОДЕЛИ!!!!
  
  db.Repo.find(null, null, {sort: {'id': 1}, limit: 25}, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('got data from db');
      res.status(200).send(data);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

