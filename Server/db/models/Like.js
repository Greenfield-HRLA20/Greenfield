const connection = require('../index.js');
const Sequelize = require('sequelize');

const Like = connection.define('like', {
});

module.exports = Like;