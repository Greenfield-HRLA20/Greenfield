const connection = require('../index.js');
const Sequelize = require('sequelize');
const User = require('./User');

const Post = connection.define('post', {
  caption: Sequelize.STRING,
  url: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  likeCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

// associations
Post.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });


module.exports = Post;