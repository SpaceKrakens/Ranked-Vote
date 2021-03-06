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
                if (models.sequelize.getDialect() !== 'mysql') {
                    option = {ignoreDuplicates: true};
                } else {
                    option = {updateOnDuplicate: []};
                }
                models.Project.bulkCreate(data, option)
                    .then(function (projects) {
                        user.setProjects(projects);
                    });
            } else {
                console.error('Gateway Timeout');
            }
        });
    },
    // Returns the data we need for the database (and in correct format)
    getData: function (projects) {
        return projects.reduce(function (acc, curr) {
            acc.push({id: curr.id, name: curr.name, url: curr.url,
                owner: curr.owner.login});
            return acc;
        }, []);
    },
};

module.exports = repoImporter;
