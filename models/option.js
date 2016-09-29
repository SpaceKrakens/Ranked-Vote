'use strict';
module.exports = function (sequelize, DataTypes) {
    var Option = sequelize.define('Option', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        classMethods: {
            associate: function (models) {
                Option.belongsTo(models.Poll);
            }
        }
    });
    return Option;
};