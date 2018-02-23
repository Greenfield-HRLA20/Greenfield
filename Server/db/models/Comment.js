const connection = require('../index.js');
const Sequelize = require('sequelize');

const Comment = connection.define('comment', {
  message: Sequelize.STRING,
});

module.exports = Comment;