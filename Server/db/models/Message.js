const connection = require('../index.js');
const Sequelize = require('sequelize');

const Message = connection.define('message', {
  message: Sequelize.STRING,
});

module.exports = Comment;