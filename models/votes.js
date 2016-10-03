"use strict";

module.exports = function(sequelize, DataTypes) {
    var Vote = sequelize.define("Vote", {
        title: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Vote.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Vote;
};
