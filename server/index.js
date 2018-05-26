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

var names = {};
var currOwner = '';

app.post('/repos', function (req, res, next) {
  currOwner = req.body.term;

  if(names[currOwner] === undefined) {
    names[currOwner] = true;
    helpers.getReposByUsername(currOwner, (data) => {
    data.forEach((repo) => db.save(repo))
    })
  }
  res.status(201).send();
 });




app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos

///////////////////////РАБОТАЕТ НА МОДЕЛИ!!!!

  db.Repo.find({owner: currOwner}, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      let sorted = data.sort((a, b) => b.id - a.id);
      res.status(200).send(sorted);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

