const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
  };
    request(options, function(err, data) {
    if (err) {
      callback(err, null); 
    } else {
      console.log('github data received', data)
      callback(null, data);
    }
  })
}

module.exports.getReposByUsername = getReposByUsername;