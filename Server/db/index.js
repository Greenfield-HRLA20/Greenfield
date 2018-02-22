const mysql = require('mysql2');
const Sequelize = require('sequelize');

const connection = new Sequelize('instaDB', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  // To create a pool of connections
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
 });
 

module.exports = { connection };