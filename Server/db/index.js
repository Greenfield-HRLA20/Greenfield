const mysql = require('mysql2');
const Sequelize = require('sequelize');

// Requiring models
const Message = require('./models/Message.js');
const Follow = require('./models/Follow.js');
const Like = require('./models/Like.js');
const Post = require('./models/Post.js');
const User = require('./models/User.js');

const connection = new Sequelize('instaDB', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

//  define relationships/foreign keys here

// Post.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
// User.hasMany(Post);

module.exports = connection;