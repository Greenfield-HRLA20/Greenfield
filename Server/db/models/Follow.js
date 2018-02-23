const connection = require('../index.js');
const Sequelize = require('sequelize');

const Follow = connection.define('follow', {
});

module.exports = Follow;