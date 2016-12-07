'use strict';
module.exports = function (sequelize, DataTypes) {
    var UserProject = sequelize.define('UserProject', {
        type: DataTypes.STRING
    });

    return UserProject;
};
