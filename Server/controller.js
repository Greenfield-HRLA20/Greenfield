const connection = require('./db/index');
const User = require('./db/models/User');
const Post = require('./db/models/Post');
const Comment = require('./db/models/Comment');
const Like = require('./db/models/Like');
const Follow = require('./db/models/Follow');
const bluebird = require('bluebird');
const CommentController = require('./db/controllers/CommentController.js');
const FollowController = require('./db/controllers/FollowController.js');
const LikeController = require('./db/controllers/LikeController.js');
const PostController = require('./db/controllers/PostController.js');
const UserController = require('./db/controllers/UserController.js');


// authenticate + sync sequelize tables
connection.authenticate().then(() => {
  console.log('connected');
  User.sync({force: true}).then(() => {
    console.log('User table synced!');
    Post.sync({force: true}).then(() => {
      console.log('Post table synced!');
      Like.sync({force:true}).then(() => {
        console.log('Like table synced!');
      }).catch((err) => {
        console.log(err);
      });
      Comment.sync({force: true}).then(() => {
        console.log('Comment table synced!');
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
    Follow.sync({force:true}).then(() => {
      console.log('Follow table synced!');
    }).catch(err => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
});

/* Handle requests to each page */

module.exports.showExplorePage = (req, res) => {
  // Query for all posts from posts table
    // sort results before exporting
    // for each post, get each comment
    // add comments to comments array for each post object
  // send array back to client
  res.send('Hello from the EXPLORE page!');
}

module.exports.showFeedPage = (req, res) => {
  // Query for people you're following in users table
  // make sure to add yourself to that list
  // limit to ppl you're following and sort by createdAt
  // go to the post table
  // get all of the posts matching the ids of ppl you're following
    // for each post, get each comment
    // add comments to comments array for each post object
  // send array back to client
  
  res.send('Hello from the FEED page!');
}

module.exports.showProfilePage = (req, res) => {
  // given user table, get user's user ID
  // go to the posts table
  // get all of the posts matching self
    // for each post, get each comment
    // add comments to comments array for each post object
  // send array back to client
  res.send('Hello from the profile page!');
}

/* User functionality/interaction functionality*/
module.exports.submitPost = (req, res) => {
  // get userid from users table
  UserController.getUserId(req.body.user, (user) => {
    PostController.addPost(req.body.caption, req.body.postUrl, user, function(post) {
      if (post) {
        res.send(post);
      }
    });
  });
  // given url and caption and user ID
  
  // use save post function to save post to db
  // res.send('submitPost controller function');
}

module.exports.addLike = (req, res) => {
  // toggleLike (like controller);
  // get boolean response and pass into modifyLikes()
  res.send('addLike controller function');
}

module.exports.addComment = (req, res) => {
  // invoke addComment() from CommentController
  CommentController.addComment(req.body.msg, req.body.postId, req.body.userId, function(comment) {
    if (comment) {
      res.send(comment);
    }
  });
}

//work on submitPost and addComment