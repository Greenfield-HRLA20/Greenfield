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
  User.sync({force: false}).then(() => {
    console.log('User table synced!');
    Post.sync({force: false}).then(() => {
      console.log('Post table synced!');
      Like.sync({force:false}).then(() => {
        console.log('Like table synced!');
      }).catch((err) => {
        console.log(err);
      });
      Comment.sync({force: false}).then(() => {
        console.log('Comment table synced!');
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
    Follow.sync({force:false}).then(() => {
      console.log('Follow table synced!');
    }).catch(err => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
});

/* Handle requests to each page */

module.exports.showExplorePage = async (req, res) => {
  try {
    let posts = await PostController.getAllPosts();
    for (let i = 0; i < posts.length; i++) {
      let result = await CommentController.getCommentsByPostId(posts[i].id)
      posts[i].dataValues.comments = result
    }
    res.send(posts);
  } catch(err) {
    console.log(err)
  }
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

// PROFILE ===================================================
module.exports.showProfilePage = (req, res) => {
  
  // localhost:1337/showProfilePage?user=USERNAME_HERE

  // given user table, get user's user ID
  UserController.getUserId(req.query.user, function(id) {
    // go to the posts table
    // get all of the posts matching self
    PostController.getUsersPosts(id, function(posts) {
      // send array back to client
      console.log('THESES ARE THE POSTS FROM THE USER: ', posts);
      res.send(posts);

      // for each post, get each comment
      // add comments to comments array for each post object
      // res.send('Hello from the profile page!');
    })
      
  })
}

/* User functionality/interaction functionality*/
module.exports.submitPost = (req, res) => {
  // get userid from users table
  // given url and caption and user ID
  // use save post function to save post to db
  res.send('submitPost controller function');
}

module.exports.toggleLike = (req, res) => {
  // values should be pulled off of req.body
  LikeController.toggleLike(1, 1, (shouldIncrementLikes) => {
    PostController.modifyLikes(1, shouldIncrementLikes);
    res.send('Completed like modification');
  });
}

module.exports.addComment = (req, res) => {
  // invoke addComment() from CommentController
  res.send('addComment controller function');
}