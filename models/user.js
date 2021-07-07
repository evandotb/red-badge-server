const {DataTypes} = require('sequelize');
const db = require('../db');

// module.exports = (sequelize, DataTypes) => {
    const User = db.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM,
        values: ['admin', 'user'],
        defaultValue: 'user',
        allowNull: false
    },
})
// return User;
// }

module.exports = User;