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
      let result = await CommentController.getCommentsByPostId(posts[i].id);
      let handle = await UserController.getUsername(posts[i].userId);
      posts[i].dataValues.comments = result;
      posts[i].dataValues.handle = handle;
    }
    res.send(posts);
  } catch(err) {
    console.log(err)
  }
}


module.exports.showFeedPage = async (req, res) => {
  try {
    let userId = await UserController.getUserId(req.query.user);
    let followedUsersIds = await FollowController.getUsersThatUserIsFollowing(userId);
    followedUsersIds.push(userId);
    console.log('these are the followeduserids',followedUsersIds);
    let userPosts = await PostController.getFeedPosts(followedUsersIds);
    for (let i = 0; i < userPosts.length; i++) {
      let result = await CommentController.getCommentsByPostId(userPosts[i].id);
      let handle = await UserController.getUsername(posts[i].userId);
      userPosts[i].dataValues.comments = result;
      userPosts[i].dataValues.handle = handle;
    }
    res.send(userPosts);
  } catch(err) {
    console.log(err)
  }
}

// PROFILE ===================================================
module.exports.showProfilePage = async (req, res) => {
  try {
  // localhost:1337/showProfilePage?user=USERNAME_HERE
    let userId = [await UserController.getUserId(req.query.user)];
    let userPosts = await PostController.getFeedPosts(userId);
    for (let i = 0; i < userPosts.length; i++) {
      let result = await CommentController.getCommentsByPostId(userPosts[i].id)
      userPosts[i].dataValues.comments = result
    }
    res.send(userPosts);
  } catch (err) {
    console.log('there was an error', err);
  }
}

/* User functionality/interaction functionality*/
module.exports.submitPost = async (req, res) => {
  try {
    let userId = await UserController.getUserId(req.body.handle);
    let post = await PostController.submitPost(req.body.caption, req.body.postUrl, userId, req.body.mediaType);
    res.send(post);
  } catch (err) {
    console.log('something went wrong with submitting a post', err);
  }
}

module.exports.addComment = async (req, res) => {
  try {
    let userId = await UserController.getUserId(req.body.handle);
    let comment = await CommentController.addComment(req.body.comment, req.body.postId, userId);
    res.send(comment);
  } catch (err) {
    console.log(err);
  }
}

module.exports.addUser = async (req, res) => {
  try {
    let result = await UserController.checkAndOrSaveUser(req.body.handle);
    res.send(result)
  } catch (err) {
    console.log('something went wrong with creating a user', err)
  }
}

module.exports.toggleLike = async (req, res) => {
  try {
    let userId = await UserController.getUserId(req.body.handle);
    let result = await LikeController.toggleLike(userId, req.body.postId);
    await PostController.modifyLikes(req.body.postId, result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
}

module.exports.getUsernameForPost = async (req, res) => {
  try {
    let userId = await UserController.getUserId(req.query.handle);
    let result = await UserController.getUsername(userId);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
}