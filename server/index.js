const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());
app.use(bodyParser.json());

var fakeData = [1];

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log(req.headers, req.body, typeof req.body)
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  res.status(200).send(fakeData);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

