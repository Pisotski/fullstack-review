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

var fakeData = [
  {
    "id": 182212,
    "name": "git-consortium",
    "watchers": 17,
    "owner": {
      "login": "octocat"
    }
  },
  {
    "id": 20978623,
    "name": "hello-worId",
    "watchers": 100500,
    "owner": {
      "login": "octocat"
    }
  }
];

//HOW TO ADD MODEL IN TERMINAL

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  helpers.getReposByUsername(req.body.term)
  ///////WORKING CODE
// console.log(req.body);
//   db.save(fakeData[0], function(err, data) {
//     if (err) {
//       console.log('error on sending message to db')
//     }
//     console.log(data);
//     res.status(201).send();
//   })
  ////////END 
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos

///////////////////////РАБОТАЕТ НА МОДЕЛИ!!!!
  db.Repo.find({owner: fakeData[0].owner.login}, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(data);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

