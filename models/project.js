'use strict';
module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define('Project', {
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        owner: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Project.hasMany(models.Poll);
                Project.belongsToMany(models.User, {through: models.UserProject});
            }
        },
        instanceMethods: {
            getFullName: function () {
                return [this.owner, this.name].join('/');
            }
        },
    });
    return Project;
};
