const request = require('request');
const config = require('../config.js');



let getReposByUsername = (username, callback) => {

  let transformer = function(array) {
    array = JSON.parse(array);
    return array.map(function(repo) {
      return {'id': repo.id, 'name': repo.name, 'watchers': repo.watchers, 'owner': repo.owner.login}
    })
  }

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
  };

    request(options, function(err, data) {
    if (err) {
      console.log('github data error');
    } else {
      callback(transformer(data.body));
    }
  })
}

module.exports.getReposByUsername = getReposByUsername;