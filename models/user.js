'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        displayName: DataTypes.STRING,
        username: DataTypes.STRING,
        profileUrl: DataTypes.STRING,
        emails: DataTypes.ARRAY
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return User;
};