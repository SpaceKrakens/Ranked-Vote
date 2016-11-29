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
            console.log("{" + res + "}");
            console.log("{" + err + "}");
            if (err == null) {
                var data = repoImporter.getData(res);   
                models.Project.bulkCreate(data, {});
            }
            else {
                console.error("Gateway Timeout")
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
