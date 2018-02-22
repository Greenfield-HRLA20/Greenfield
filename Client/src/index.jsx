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


class ConnectedMain extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.updateUser);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.authSubscription = auth.firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false
      })
      this.props.updateUser({user})
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
      if (this.state.loading) { 
        return null;
      }
      
      if (this.state.currentUser) { 
        return <App />
      } else {
        return <Login />
      }
  }
}

const Main = connect(null, mapDispatchToProps)(ConnectedMain);

const app = document.getElementById('app')
ReactDOM.render(
<Provider store={store}> 
<Main />
</Provider>, app)