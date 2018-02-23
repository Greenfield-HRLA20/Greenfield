const connection = require('../index.js');
const Sequelize = require('sequelize');
const Post = require('./Post.js');

const User = connection.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  handle: {
    type: Sequelize.STRING,
    unique: true
  },
});

console.log('POST from user file ', Post);
console.log('User from user file is', User);

// User.hasMany(Post);

module.exports = User;