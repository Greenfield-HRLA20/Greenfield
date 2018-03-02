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
      <div align="center">
        {/* <h1>Hello from Login!</h1>
      <input name="username" placeholder="Enter Username" onChange={this.setInput} />
      <input name="password" type="password" placeholder="Enter Password" onChange={this.setInput} />
      <button onClick={() => this.sumbitEntry(this.state.username, this.state.password)}>Login</button> */}
        <img src="http://www.cufonfonts.com/site/makeimage?type=custom&text=Hackergram&size=100&id=20488" />
        <div id="firebaseui-auth-container" />
        <div id="loader">Loading...</div>
      </div>
    );
  }
}

export default Login;
