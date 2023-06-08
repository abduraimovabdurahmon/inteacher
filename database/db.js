const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database/db.sqlite',
    logging: false
});

module.exports = {
    sequelize,
    DataTypes,
    Model
};