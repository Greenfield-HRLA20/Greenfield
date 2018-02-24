const connection = require('../index.js');
const Sequelize = require('sequelize');
// const User = require('./User.js');

const Post = connection.define('post', {
  caption: Sequelize.STRING,
  url: Sequelize.STRING,
  createdAt: Sequelize.DATE,
});

console.log('POST from Post file ', Post);
console.log('User from Post file is', User);

module.exports = Post;