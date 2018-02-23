import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import Login from './components/login.jsx';
import auth from './Firebase';
import { Provider, connect } from 'react-redux';
import store from "./redux";
import actions from './redux/actions/index'

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(actions.updateUser(user))
  };
};

const mapStateToProps = state => {
  return {currentUser: state.currentUser}
}


class ConnectedMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.authSubscription = auth.firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false
      })
      if (user) {
        this.props.updateUser(user)
      }
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
      if (this.state.loading) { 
        return null;
      }
      
      if (this.props.currentUser) { 
        return <App />
      } else {
        return <Login />
      }
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(ConnectedMain);

const app = document.getElementById('app')
ReactDOM.render(
  <Provider store={store}> 
    <Main />
  </Provider>, app)