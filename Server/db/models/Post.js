const connection = require('../index.js');
const Sequelize = require('sequelize');
// const User = require('./User.js');

const Post = connection.define('post', {
  caption: Sequelize.STRING,
  url: Sequelize.STRING,
  createdAt: Sequelize.DATE,
});

const User = connection.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  handle: {
    type: Sequelize.STRING,
    unique: true
  },
});

// Post.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

console.log('POST from Post file ', Post);
console.log('User from Post file is', User);

module.exports = Post;