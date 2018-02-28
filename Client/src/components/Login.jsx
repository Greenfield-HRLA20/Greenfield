import React from 'react';
import auth from '../Firebase';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };

    this.setInput = this.setInput.bind(this);
  }

  componentDidMount() {
    auth.ui.start('#firebaseui-auth-container', auth.uiConfig);
  }

  setInput(e) {
    e.preventDefault();
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log(this.state),
    );
  }

  sumbitEntry(email, password) {
    auth.firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  render() {
    return (
      <div>
        {/* <h1>Hello from Login!</h1>
      <input name="username" placeholder="Enter Username" onChange={this.setInput} />
      <input name="password" type="password" placeholder="Enter Password" onChange={this.setInput} />
      <button onClick={() => this.sumbitEntry(this.state.username, this.state.password)}>Login</button> */}
        <h1>Welcome to My Awesome App</h1>
        <div id="firebaseui-auth-container" />
        <div id="loader">Loading...</div>
      </div>
    );
  }
}

export default Login;
