const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log('connection open')});

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  watchers: Number,
  owner: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo, callback) => {

  var newRepo = new Repo;
  newRepo.id = repo.id;
  newRepo.name = repo.name;
  newRepo.watchers = repo.watchers;
  newRepo.owner = repo.owner.login;
// ПРИМЕР НОРМАЛЬНОГО КОЛБЭКА

  newRepo.save((err, data) => {
    if (err) {
      console.error("err");
    } else {
      console.log('new Repo saved!')
    }
  });
}
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

//ЭКСПОРТ НЕСКОЛЬКИХ ПЕРЕМЕННЫХ!!!!

module.exports = {Repo, save};