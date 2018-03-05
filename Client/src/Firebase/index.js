const firebase = require('firebase');
const firebaseui = require('firebaseui');
const api = require('../../../firebase.config.js');

const config = {
  apiKey: api.key,
  authDomain: 'instagram-clone-f1b85.firebaseapp.com',
  databaseURL: 'https://instagram-clone-f1b85.firebaseio.com',
  projectId: 'instagram-clone-f1b85',
  storageBucket: '',
  messagingSenderId: '90516925758',
};

firebase.initializeApp(config);
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccess(currentUser, credential) {
      return false;
    },
    uiShown() {
      document.getElementById('loader').style.display = 'none';
    },
  },
  signInFlow: 'popup',
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};

module.exports.firebase = firebase;
module.exports.ui = ui;
module.exports.uiConfig = uiConfig;
