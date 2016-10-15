var models = require('../index');
var github = require('./github');

var repoImporter = {
    /**
     *
     * @param models.User user
     */
    importForUser: function (user) {
        github.repos.getForUser({
            user: user.username,
            type: "all"
        }, function (err, res) {
            // @TODO save Projects and associate them to user
            console.log(res);
        });
    }
};

module.exports = repoImporter;