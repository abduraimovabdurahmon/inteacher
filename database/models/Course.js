const {sequelize, DataTypes, Model} = require('../db');

class Course extends Model {};

Course.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    author: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    hashtag: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ratingCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    students: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    lessons: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    duration: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},
{
    sequelize,
    modelName: 'Course'
});

module.exports = Course;