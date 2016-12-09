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
            type: 'all'
        }, function (err, res) {
            if (err == null) {
                var data = repoImporter.getData(res);

                // Check if we are using mysql and use the bulk update function
                if (models.sequelize.getDialect() === 'mysql') {
                    models.Project.update(data);
                } else {
                    data.forEach(function(element) {
                        models.Project.upsert(element);
                    }, this);
                };
            } else {
                console.error('Gateway Timeout');
            };
        });
    },
    // Returns the data we need for the database (and in correct format)
    getData: function (projects) {
        var returnArray = [];
        projects.forEach(function(element) {
            var keyVal = {id: element.id, name: element.name, url: element.url};
            returnArray.push(keyVal);
        });
        return returnArray;
    },
};

module.exports = repoImporter;
