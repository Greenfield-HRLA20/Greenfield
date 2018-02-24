const connection = require('../index.js');
const Sequelize = require('sequelize');

const User = connection.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  handle: {
    type: Sequelize.STRING,
    unique: true
  },
});


module.exports = User;