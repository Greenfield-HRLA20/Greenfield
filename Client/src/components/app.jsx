import React from 'react'
import {connect} from 'react-redux'
import auth from '../Firebase'
import Bar from "../components/navbar.jsx"
import Feed from "./feed.jsx"
import actions from '../redux/actions/index'


const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(actions.logoutUser())
  };
};

const mapStateToProps = state => {
  return {currentUser: state.currentUser}
}


class ConnectedApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: <Feed />
    }

    this.logout = this.logout.bind(this);
  }

  logout () {
    auth.firebase.auth().signOut().catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
    this.props.logoutUser()
    
  }

  render() {
    return (
      <div>
          <h1><Bar /></h1>
          {this.state.currentView}
          <button onClick={this.logout}>Logout</button>
        </div>
    )
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);


export default App