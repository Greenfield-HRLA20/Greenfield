import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app.jsx';
import Login from './components/login.jsx';
import firebase from './Firebase'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';



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
      }, () => console.log(this.state))
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    return (
        <div>
        
        {/* <Route path="/login" component={Login} /> */}
        <Route exact path="/" component={Bar} />
        </div>
      
    )
  }
}
// if (this.state.loading) { 
//   return null;
// }

// if (this.state.user) { 
//   return <App />
// }

// return <Login />

const app = document.getElementById('app')
ReactDOM.render(<Main />, app)