const {sequelize, DataTypes, Model} = require('../db');

class User extends Model {}

User.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        defaultValue: null,
        unique: true
    },
    role: {
        type: DataTypes.TEXT,
        defaultValue: 'user'
    },
    image: {
        type: DataTypes.TEXT
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    confirmCode: {
        type: DataTypes.TEXT,
        defaultValue: null
    },
    resetPasswordCode: {
        type: DataTypes.TEXT,
        defaultValue: null
    }
}, {
    sequelize,
    modelName: 'User'
});

module.exports = User;
