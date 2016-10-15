var Github = require('github');

var github = new Github({
    debug: process.env.NODE_ENV == "development",
    protocol: "https",
    timeout: 300
});

module.exports = github;