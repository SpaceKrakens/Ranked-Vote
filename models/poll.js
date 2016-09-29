'use strict';
module.exports = function (sequelize, DataTypes) {
    var Poll = sequelize.define('Poll', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        type: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return Poll;
};