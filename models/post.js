const {DataTypes} = require('sequelize');
const db = require('../db');

// module.exports = (sequelize, DataTypes) => {
const Post = db.define('post', {
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})
// return Post;
// }

module.exports = Post;