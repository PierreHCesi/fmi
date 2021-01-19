const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT(),
            allowNull: false,
        },
        role: {
            type: "ENUM('ADMIN','USER')",
            allowNull: false
        },
        club_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
};
