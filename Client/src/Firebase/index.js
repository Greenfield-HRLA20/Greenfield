const api = require('../../../firebase.config');

var config = {
  apiKey: api.key,
  authDomain: "instagram-clone-f1b85.firebaseapp.com",
  databaseURL: "https://instagram-clone-f1b85.firebaseio.com",
  projectId: "instagram-clone-f1b85",
  storageBucket: "",
  messagingSenderId: "90516925758"
};

firebase.initializeApp(config);
