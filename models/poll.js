'use strict';
module.exports = function (sequelize, DataTypes) {
    var Poll = sequelize.define('Poll', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        type: DataTypes.ENUM('ranked', 'ranked-all', 'pick-one', 'pick-many'),
        access: DataTypes.ENUM('all', 'password', 'contributor', 'maintainer'),
        password: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Poll.hasMany(models.Vote);
                Poll.hasMany(models.Option);
                Poll.belongsTo(models.Project);
            }
        }
    });
    return Poll;
};