import React from 'react'
<<<<<<< HEAD
import firebase from '../Firebase'
import Bar from "../components/navbar.jsx"
import {Router, Route, Link} from 'react-router-dom';
=======
import auth from '../Firebase'
>>>>>>> [Client] Using firebase UI

class App extends React.Component {
  constructor() {
    super();
  }

  logout () {
    auth.firebase.auth().signOut().then(function() {
      console.log('Logged Out');
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
    
  }

  render() {
    return (
      <div>
        
          <h1><Bar /></h1>
          
          <button onClick={this.logout}>Logout</button>
        
        </div>
    )
  }
}

export default App