// const mysql = require('mysql2');
// const Sequelize = require('sequelize');


// const connection = new Sequelize('instaDB', 'root', 'password', {
//   host: 'localhost',
//   dialect: 'mysql',
 
//   // To create a pool of connections
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },

//  });

// // THIS WILL CHECK IF SEQUELIZE SERVER IS RUNNING
// connection
//   .authenticate()
//   .then(() => {
//     console.log('Connected to Sequelize server (database: instaDB)..');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
const Post = connection.define('post', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  caption: Sequelize.STRING,
  user_id: {
    type: Sequelize.INTEGER,
    // references: {
    //   model: 'user',
    //   key: 'id'
    // }
  },
  url: Sequelize.STRING,
  createdAt: Sequelize.DATE,
});

const Comment = connection.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  message: Sequelize.STRING,
  user_id: {
    type: Sequelize.INTEGER,
    // references: {
    //   model: 'user',
    //   key: 'id'
    // }
  },
  post_id: {
    type: Sequelize.INTEGER,
    // references: {
    //   model: 'post',
    //   key: 'id'
    // }
  },
  createdAt: Sequelize.DATE,
});

const Like = connection.define('like', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    // references: {
    //   model: 'user',
    //   key: 'id'
    // }
  },
  post_id: {
    type: Sequelize.INTEGER,
    // references: {
    //   model: 'post',
    //   key: 'id'
    // }
  }
});

const Follow = connection.define('follow', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    // references: {
    //   model: 'user',
    //   key: 'id'
    // }
  },
  follower_id: {
    type: Sequelize.INTEGER
  }
});


module.exports = { connection, User, Post, Like, Follow, Comment };
// module.exports = { connection, User };