const { connection, User, Post, Like, Follow, Comment } = require('./db/index');
// const { connection, User } = require('./db/index');


connection.sync().then(() => {
  // // finding all users query
  // User.findAll().then(users => {
  //   console.log('Find All Users query: ', users.dataValues);
  // })

  // // finding number of all users query
  // User.findAll().then(users => {
  //   console.log('Find All Users query: ', users.length);
  // })

  // // finding user by id query
  // User.findById(1).then(users => {
  //   console.log('Find All Users query: ', users.dataValues);
  // })
});

// CREATING DUMMY DATA
//

// remove {force: true} when live -- overrides/replaces previous data with same name
User.sync({force: true}).then(() => {
  return User.create({
    id: 1,
    firstName: 'John',
    lastName: 'Hancock',
    handle: 'jhancock'
  });
});

Post.sync({force: true}).then(() => {
  return Post.create({
    id: 1,
    caption: 'Check out the view!',
    user_id: 1,
    url: 'www.google.com'
  });
});

Comment.sync({force: true}).then(() => {
  return Comment.create({
    id: 1,
    message: 'Cool Picture!',
    user_id: 2,
    post_id: 1,
  });
});

Comment.sync({force: true}).then(() => {
  return Comment.create({
    id: 2,
    message: 'Thanks!',
    user_id: 1,
    post_id: 1,
  });
});

Like.sync({force: true}).then(() => {
  return Like.create({
    id: 1,
    user_id: 2,
    post_id: 1,
  });
});

Follow.sync({force: true}).then(() => {
  return Follow.create({
    id: 1,
    user_id: 2,
    follower_id: 1,
  });
});

User.sync({force: true}).then(() => {
  return User.create({
    id: 2,
    firstName: 'Bob',
    lastName: 'Smith',
    handle: 'bsmith'
  });
});

//
// END DUMMY DATA


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