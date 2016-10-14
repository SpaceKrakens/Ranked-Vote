'use strict';
module.exports = function (sequelize, DataTypes) {
    var Vote = sequelize.define('Vote', {
        data: {
            type: DataTypes.TEXT,
            get: function () {
                var object = JSON.parse(this.getDataValue('data'));
                return object || [];
            },
            set: function (array) {
                var string = JSON.stringify(array);
                this.setDataValue('data', string);
            }
        }
    }, {});
    return Vote;
};