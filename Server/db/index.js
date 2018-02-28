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
const config = require('../../database.config');

const connection = new Sequelize('instadb', config.user, config.password, {
  host: config.ip,
  dialect: 'mysql',
  port: 3306
});

<<<<<<< HEAD
module.exports = connection;
=======
module.exports = connection;
>>>>>>> Allow app to render .png and .gif files
