import React from 'react'
import firebase from '../Firebase'


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }

    this.setInput = this.setInput.bind(this)
  }

  setInput (e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
  }

  sumbitEntry (email, password) {
    console.log('in here!')
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  render() {
    return (
    <div>
      <h1>Login</h1>
      <input name="username" placeholder="Enter Username" onChange={this.setInput} />
      <input name="password" type="password" placeholder="Enter Password" onChange={this.setInput} />
      <button onClick={() => this.sumbitEntry(this.state.username, this.state.password)}>Login</button>
    </div>
    )
  }
}

export default Login