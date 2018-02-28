// const mysql = require('mysql2');
// const Sequelize = require('sequelize');

// const connection = new Sequelize('instaDB', 'root', 'password', {
//   host: 'localhost',
//   dialect: 'mysql',
//   port: 3306
// });

// module.exports = connection;

const mysql = require('mysql2');
const Sequelize = require('sequelize');
<<<<<<< HEAD
const config = require('../../database.config');

const connection = new Sequelize('instadb', config.user, config.password, {
  host: config.ip,
=======
const database = require('../../database.config.js');

const connection = new Sequelize('instadb', database.user, database.password, {
  host: database.ip,
>>>>>>> commit for rebase
  dialect: 'mysql',
  port: 3306,
});

module.exports = connection;
