'use strict';
module.exports = function (sequelize, DataTypes) {
    var Poll = sequelize.define('Poll', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        type:  DataTypes.ENUM('ranked', 'ranked-all', 'pick-one', 'pick-many'),
        access: DataTypes.ENUM('all', 'password', 'contributor', 'maintainer'),
        password: DataTypes.STRING,
        timeLimit: DataTypes.STRING,
        closingDate: DataTypes.DATE
    }, {
        classMethods: {
            associate: function (models) {
                Poll.belongsToMany(models.User, {through: models.Vote});
                Poll.hasMany(models.Option);
                Poll.belongsTo(models.Project);
            }
        }
    });
    return Poll;
};
