const Sequelize = require('sequelize');
// const User = require('./models/user');
// const Post = require('./models/post');
// const Comment = require('./models/comment');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
	// host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function(){
		console.log('Connected to postres db');
	},
	function(err){
		console.log(err);
	}
);

// User = sequelize.import('./models/user');
// Post = sequelize.import('./models/post');
// Comment = sequelize.import('./models/comment');

// User.hasMany(Post);
// Post.belongsTo(User);

// Post.hasMany(Comment); 
// Comment.belongsTo(Post);

module.exports = sequelize;