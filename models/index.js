'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};

var sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password,
      config);
}

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) &&
        (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.Poll.addScope('allowedForUser', function (user) {
    return {
        include: [{
            model: db.Project,
            include: [{
                model: db.User,
                through: db.UserProject
            }],

        }],
        where: {
            $or: [
                {'$Project.Users.id$': user.id},
                {access: ['password', 'all']}
            ]
        }
    };
});

db.transformToObject = function(array) {
    var result = {};
    result.ids = Array();
    for (var i = 0; i < array.length; i++){
        var obj = array[i];
        result.ids.push(obj.id);
        result[obj.id] = obj;
    }
    return result;
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
