import React from 'react'
import firebase from '../Firebase'

class App extends React.Component {
  constructor() {
    super();
  }

  logout () {
    firebase.auth().signOut().then(function() {
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
      <h1>Hello from App!</h1>
      <button onClick={this.logout}>Logout</button>
    </div>
    )
  }
}

export default App