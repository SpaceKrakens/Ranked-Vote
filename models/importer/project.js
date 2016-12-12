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
                if (models.sequelize.getDialect() === 'postgress') {
                    data.forEach(function (element) {
                        models.Project.upsert(element).then(function (project) {
                            user.addProject(project);
                        });
                    }, this);

                } else {
                    models.Project.bulkCreate(data, {updateOnDuplicate: []}).then(function (projects) {
                        user.setProjects(projects);
                    });
                }
            } else {
                console.error('Gateway Timeout');
            }
        });
    },
    // Returns the data we need for the database (and in correct format)
    getData: function (projects) {
        return projects.reduce(function (acc, curr) {
            acc.push({id: curr.id, name: curr.name, url: curr.url});
            return acc;
        }, []);
    },
};

module.exports = repoImporter;
