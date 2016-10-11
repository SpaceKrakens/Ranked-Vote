'use strict';
module.exports = function (sequelize, DataTypes) {
    var Vote = sequelize.define('Vote', {
        data: DataTypes.TEXT
    }, {
        classMethods: {
            associate: function (models) {
                Vote.belongsTo(models.User);
                Vote.belongsTo(models.Poll);
            }
        },
        indexes: [
            {
                unique: true,
                fields: ['userId', 'pollId']
            }
        ]
    });
    return Vote;
};