const connection = require('../index.js');
const Sequelize = require('sequelize');
const User = require('./User');
const Post = require('./Post');

const Comment = connection.define('comment', {
  Comment: Sequelize.STRING,
});

// associations
Comment.belongsTo(Post, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

module.exports = Comment;