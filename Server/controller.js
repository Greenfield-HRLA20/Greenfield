const connection = require('./db/index');
const User = require('./db/models/User');
const Post = require('./db/models/Post');
const Comment = require('./db/models/Comment');
const Like = require('./db/models/Like');
const Follow = require('./db/models/Follow');
const CommentController = require('./db/controllers/CommentController.js');
const FollowController = require('./db/controllers/FollowController.js');
const LikeController = require('./db/controllers/LikeController.js');
const PostController = require('./db/controllers/PostController.js');
const UserController = require('./db/controllers/UserController.js');

// authenticate + sync sequelize tables
connection.authenticate().then(() => {
  console.log('connected');
  User.sync({ force: false })
    .then(() => {
      console.log('User table synced!');
      Post.sync({ force: false })
        .then(() => {
          console.log('Post table synced!');
          Like.sync({ force: false })
            .then(() => {
              console.log('Like table synced!');
            })
<<<<<<< HEAD
            .catch(err => {
=======
            .catch((err) => {
>>>>>>> Allow app to render .png and .gif files
              console.log(err);
            });
          Comment.sync({ force: false })
            .then(() => {
              console.log('Comment table synced!');
            })
<<<<<<< HEAD
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
=======
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
>>>>>>> Allow app to render .png and .gif files
          console.log(err);
        });
      Follow.sync({ force: false })
        .then(() => {
          console.log('Follow table synced!');
        })
<<<<<<< HEAD
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
=======
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
>>>>>>> Allow app to render .png and .gif files
      console.log(err);
    });
});

/* Handle requests to each page */

module.exports.showExplorePage = async (req, res) => {
  try {
    const posts = await PostController.getAllPosts();
    for (let i = 0; i < posts.length; i++) {
<<<<<<< HEAD
      let result = await CommentController.getCommentsByPostId(posts[i].id);
      let handle = await UserController.getUsername(posts[i].userId);
      let uid = await UserController.getUid(posts[i].userId);
=======
      const result = await CommentController.getCommentsByPostId(posts[i].id);
      const handle = await UserController.getUsername(posts[i].userId);
>>>>>>> Allow app to render .png and .gif files
      posts[i].dataValues.comments = result;
      posts[i].dataValues.handle = handle;
      posts[i].dataValues.uid = uid;
    }
    res.send(posts);
  } catch (err) {
    console.log(err);
  }
};

module.exports.showFeedPage = async (req, res) => {
  try {
<<<<<<< HEAD
    let userId = await UserController.getUserId(req.query.user);
    let followedUsersIds = await FollowController.getUsersThatUserIsFollowing(
      userId
    );
=======
    const userId = await UserController.getUserId(req.query.user);
    const followedUsersIds = await FollowController.getUsersThatUserIsFollowing(userId);
>>>>>>> Allow app to render .png and .gif files
    followedUsersIds.push(userId);
    const userPosts = await PostController.getFeedPosts(followedUsersIds);
    for (let i = 0; i < userPosts.length; i++) {
<<<<<<< HEAD
      let result = await CommentController.getCommentsByPostId(userPosts[i].id);
      let handle = await UserController.getUsername(userPosts[i].userId);
      let uid = await UserController.getUid(userPosts[i].userId);
=======
      const result = await CommentController.getCommentsByPostId(userPosts[i].id);
      const handle = await UserController.getUsername(userPosts[i].userId);
>>>>>>> Allow app to render .png and .gif files
      userPosts[i].dataValues.comments = result;
      userPosts[i].dataValues.handle = handle;
      userPosts[i].dataValues.uid = uid;
    }
    res.send(userPosts);
  } catch (err) {
    console.log(err);
  }
};

// PROFILE ===================================================
module.exports.showProfilePage = async (req, res) => {
  try {
    // localhost:1337/showProfilePage?user=USERNAME_HERE
    let userId = [await UserController.getUserId(req.query.user)];
    let userPosts = await PostController.getFeedPosts(userId);
    for (let i = 0; i < userPosts.length; i++) {
      let result = await CommentController.getCommentsByPostId(userPosts[i].id);
      let handle = await UserController.getUsername(userPosts[i].userId);
      let uid = await UserController.getUid(userPosts[i].userId);
      userPosts[i].dataValues.comments = result;
      userPosts[i].dataValues.handle = handle;
      userPosts[i].dataValues.uid = uid;
    }
    res.send(userPosts);
  } catch (err) {
    console.log('there was an error', err);
  }
};

/* User functionality/interaction functionality */
module.exports.submitPost = async (req, res) => {
  try {
<<<<<<< HEAD
    let userId = await UserController.getUserId(req.body.uid);
    let post = await PostController.submitPost(
      req.body.caption,
      req.body.postUrl,
      userId,
      req.body.mediaType
=======
    const userId = await UserController.getUserId(req.body.handle);
    const post = await PostController.submitPost(
      req.body.caption,
      req.body.postUrl,
      userId,
      req.body.mediaType,
>>>>>>> Allow app to render .png and .gif files
    );
    res.send(post);
  } catch (err) {
    console.log('something went wrong with submitting a post', err);
  }
};

module.exports.addComment = async (req, res) => {
  try {
<<<<<<< HEAD
    let userId = await UserController.getUserId(req.body.uid);
    let comment = await CommentController.addComment(
      req.body.comment,
      req.body.postId,
      userId
    );
=======
    const userId = await UserController.getUserId(req.body.handle);
    const comment = await CommentController.addComment(req.body.comment, req.body.postId, userId);
>>>>>>> Allow app to render .png and .gif files
    res.send(comment);
  } catch (err) {
    console.log(err);
  }
};

module.exports.addUser = async (req, res) => {
  try {
<<<<<<< HEAD
    let result = await UserController.checkAndOrSaveUser(
      req.body.handle,
      req.body.uid
    );
=======
    const result = await UserController.checkAndOrSaveUser(req.body.handle);
>>>>>>> Allow app to render .png and .gif files
    res.send(result);
  } catch (err) {
    console.log('something went wrong with creating a user', err);
  }
};

module.exports.toggleLike = async (req, res) => {
  try {
<<<<<<< HEAD
    let userId = await UserController.getUserId(req.body.uid);
    let result = await LikeController.toggleLike(userId, req.body.postId);
=======
    const userId = await UserController.getUserId(req.body.handle);
    const result = await LikeController.toggleLike(userId, req.body.postId);
>>>>>>> Allow app to render .png and .gif files
    await PostController.modifyLikes(req.body.postId, result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports.requestFollow = async (req, res) => {
  console.log('in the controller!');
  try {
<<<<<<< HEAD
    let userId = await UserController.getUserId(req.body.userUid);
    let targetId = await UserController.getUserId(req.body.targetUserUid);
=======
    const userId = await UserController.getUserId(req.body.userName);
    const targetId = await UserController.getUserId(req.body.targetUserName);
>>>>>>> Allow app to render .png and .gif files
    await FollowController.createFollowRequest(userId, targetId);
    res.send('Follow request sent');
  } catch (err) {
    console.log(err);
  }
};

module.exports.respondFollow = async (req, res) => {
  try {
    if (req.body.responseType === 'accept') {
      await FollowController.acceptFollowRequest(
        req.body.userId,
        req.body.targetId
      );
    } else if (req.body.responseType === 'deny') {
      await FollowController.denyFollowRequest(
        req.body.userId,
        req.body.targetId
      );
    } else {
      return 'something went wrong with responding to request';
    }
    res.send('you responded to the follow request');
  } catch (err) {
    console.log(err);
  }
};

module.exports.checkFollowRelationship = async (req, res) => {
  try {
<<<<<<< HEAD
    let userId = await UserController.getUserId(req.query.userUid);
    let targetId = await UserController.getUserId(req.query.targetUid);
    let relationshipExists = await FollowController.checkFollowRelationship(
      userId,
      targetId
    );
=======
    const userId = await UserController.getUserId(req.query.userName);
    const targetId = await UserController.getUserId(req.query.targetUserName);
    const relationshipExists = await FollowController.checkFollowRelationship(userId, targetId);
>>>>>>> Allow app to render .png and .gif files
    res.send(relationshipExists);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getPendingFollowRequests = async (req, res) => {
  try {
    const userId = await UserController.getUserId(req.query.userName);
    const result = await FollowController.getPendingFollowRequests(userId);
    for (let i = 0; i < result.length; i++) {
      result[i].dataValues.handle = await UserController.getUsername(
        result[i].userId
      );
    }
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};
