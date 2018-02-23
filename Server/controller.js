const connection = require('./db/index');
const User = require('./db/models/User');
const Post = require('./db/models/Post');
const Comment = require('./db/models/Comment');
const Like = require('./db/models/Like');
const Follow = require('./db/models/Follow');
const bluebird = require('bluebird');

// connection.authenticate().then(() => {
//   User.sync().then(() => {
    
//     Post.sync().then(() => {
//       User.create({
//         firstName: 'John',
//         lastName: 'Hancock',
//         handle: 'jhancock'
//       });
    
//       User.create({
//         firstName: 'Bob',
//         lastName: 'Smith',
//         handle: 'bsmith'
//       }).then((user) => {
//         console.log(user);
//         Post.create({
//           userId: user.dataValues.id,
//           caption: 'Check out the view!',
//           url: 'www.google.com',
//         });
//       })
//     });
//   });

module.exports.handleHomePage = (req, res) => {
  connection.sync().then(() => {

    User.findById(2).then(users => {
      console.log(users)
      // users.forEach(user => {
      //   console.log("this is console per user!", user.dataValues);
      // })
    });
    res.send('Hello from the main page!');
  })
}

/* Handle requests to each page */

module.exports.showExplorePage = (req, res) => {
  res.send('Hello from the EXPLORE page!');
}

module.exports.showFeedPage = (req, res) => {
  res.send('Hello from the FEED page!');
}
module.exports.showCreatePostPage = (req, res) => {
  res.send('Hello from the CreatePostPage page!');
}
module.exports.showProfilePage = (req, res) => {
  res.send('Hello from the profile page!');
}

/* User functionality/interaction functionality*/
module.exports.submitPost = (req, res) => {
  res.send('submitPost controller function');
}

module.exports.viewPhoto = (req, res) => {
  res.send('Hello from the viewPhoto page!');
}

module.exports.addLike = (req, res) => {
  res.send('addLike controller function');
}

module.exports.addComment = (req, res) => {
  res.send('addComment controller function');
}