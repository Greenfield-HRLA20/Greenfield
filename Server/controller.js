module.exports.handleHomePage = (req, res) => {
  res.send('Hello from the main page!');
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