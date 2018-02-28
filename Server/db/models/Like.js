const connection = require('../index.js');
const Sequelize = require('sequelize');
const User = require('./User');
const Post = require('./Post');

const Like = connection.define('like', {});

// associations
Like.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Like.belongsTo(Post, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

module.exports = Like;
