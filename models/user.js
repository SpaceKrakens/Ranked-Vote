'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        displayName: DataTypes.STRING,
        username: DataTypes.STRING,
        profileUrl: DataTypes.STRING,
        emails: {
            type: DataTypes.TEXT,
            get: function () {
                var object = JSON.parse(this.getDataValue('emails'));
                return object;
            },
            set: function (array) {
                var string = JSON.stringify(array);
                this.setDataValue('emails', string);
            }
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return User;
};