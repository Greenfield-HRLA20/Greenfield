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

module.exports.showExplorePage = (req, res) => {
  // Query for all posts from posts table [done]
    // sort results before exporting [done]
    // for each post, get each comment
    // add comments to comments array for each post object
  // send array back to client
  let result = [];

  PostController.getAllPosts(posts => {


    // iterating through each of the posts
    postsWithComments = posts.map((post) => {

      // getting all of the comments for single post
      CommentController.getCommentsByPostId(post.id, (comments) => {
        
        // associating the post's comments with the post
        post.comments = comments // msgs.map(msg => msg.Comment)
        console.log(`Current post has ${post.comments.length} comments`);

      })
      return post;
    })
    console.log('All finished!');
    res.json(postsWithComments);
    // res.send('Hello from the EXPLORE page!'); 
  })
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