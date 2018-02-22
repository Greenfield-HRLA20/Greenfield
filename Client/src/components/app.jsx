import React from 'react'
import {connect} from 'react-redux'
import auth from '../Firebase'
import Bar from "../components/navbar.jsx"
import Feed from "./feed.jsx"

const mapDispatchtoProps = dispatch => {
  return {
    auth: user => dispatch(auth(user))
  }
}


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentView: <Feed />
    }
  }

  logout () {
    auth.firebase.auth().signOut().catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
    
  }

  render() {
    return (
      <div>
        <p>hello</p>
          <h1><Bar /></h1>
          
          {this.state.currentView}
          <button onClick={this.logout}>Logout</button>
        </div>
    )
  }
}

export default App