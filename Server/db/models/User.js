const connection = require('../index.js');
const Sequelize = require('sequelize');

const User = connection.define('user', {
  uid: {
    type: Sequelize.STRING,
    unique: true
  },
  handle: Sequelize.STRING
});

module.exports = User;
