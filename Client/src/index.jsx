import React from 'react'
import ReactDOM from 'react-dom'
<<<<<<< HEAD
import App from './components/app.jsx';
import Login from './components/login.jsx';
import firebase from './Firebase'
import {BrowserRouter, Router, Route, Link, Redirect} from 'react-router-dom';

=======
import App from './components/app.jsx'
import Login from './components/login.jsx'
import auth from './Firebase'
>>>>>>> [Client] Using firebase UI


class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
    };
  }

  componentDidMount() {
<<<<<<< HEAD
    var user = firebase.auth().currentUser;
    // firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({
          loggedin: true,
          user,
        }, () => <Redirect to={{pathname:'/explore'}} />);
      }
      else {
        console.log('not logged in');
        <Redirect to={{pathname:'/login'}} />
      }
    // });
=======
    this.authSubscription = auth.firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      }, () => console.log(this.state))
    });
  }

  componentWillUnmount() {
    this.authSubscription();
>>>>>>> [Client] Using firebase UI
  }

  render() {
    return (
      
      <div>
        <BrowserRouter>
      <div>
      <Route path="/" component={Login} />
      <Route path="/explore" component={App}/>
      </div>
        </BrowserRouter>
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