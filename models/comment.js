const {DataTypes} = require('sequelize');
const db = require('../db');

// module.exports = (sequelize, DataTypes) => {
const Comment = db.define('comment', {
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})
// return Comment;
// }

module.exports = Comment;