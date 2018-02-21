import React from 'react'
import ReactDOM from 'react-dom'
import App from './component/app.jsx';
import Login from './component/login.jsx';
import firebase from 'react-native-firebase';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    if (this.state.loading) return null;

    if (this.state.user) return <LoggedIn />;
    
    return <LoggedOut />;
  }
}