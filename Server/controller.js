const connection = require('./db/index');
const User = require('./db/models/User');
const Post = require('./db/models/Post');
const Message = require('./db/models/Message');
const Like = require('./db/models/Like');
const Follow = require('./db/models/Follow');
const bluebird = require('bluebird');

connection.authenticate().then(() => {
  console.log('connected');
  // User.sync().then(() => {
  
  //   Post.sync().then(() => {
  //     User.create({
  //       firstName: 'John',
  //       lastName: 'Hancock',
  //       handle: 'jhancock'
  //     });
    
  //     User.create({
  //       firstName: 'Bob',
  //       lastName: 'Smith',
  //       handle: 'bsmith'
  //     }).then((user) => {
  //       console.log(user);
  //       Post.create({
  //         userId: user.dataValues.id,
  //         caption: 'Check out the view!',
  //         url: 'www.google.com',
  //       });
  //     })
  //   });
  }).catch((err) => {
    console.log(err);
  });

module.exports.handleHomePage = (req, res) => {
  // connection.sync().then(() => {

  //   User.findById(2).then(users => {
  //     console.log(users)
  //     // users.forEach(user => {
  //     //   console.log("this is console per user!", user.dataValues);
  //     // })
  //   });
  //   res.send('Hello from the main page!');
  // })
}

/* Handle requests to each page */

module.exports.showExplorePage = (req, res) => {
  // Query for all pictures/videos in the pictures/videos table
    // Consider applying limit to number of records in query
    // Send back records to update state on front end
  res.send('Hello from the EXPLORE page!');
}

module.exports.showFeedPage = (req, res) => {
  // Query the follows table to determine everyone that user follows
    // Query pictures/videos table for pictures/videos owned by these users
    // Consider applying limit to number of records in query
    // Send back records to update state on front end
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
  // Add comment from request to the Comments table
  // Query for all comments belonging to the specific picture/video
  // Send back the updated list of comments for specific picture/video
  res.send('addComment controller function');
}