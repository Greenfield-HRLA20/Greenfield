const mysql = require('mysql2');
const Sequelize = require('sequelize');

const connection = new Sequelize('instaDB', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

 
module.exports = connection;