import React from 'react';
import auth from '../Firebase';

class Login extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    auth.ui.start('#firebaseui-auth-container', auth.uiConfig);
  }

  render() {
    return (
      <div align="center">
        <img src="http://www.cufonfonts.com/site/makeimage?type=custom&text=Hackergram&size=100&id=20488" />
        <div id="firebaseui-auth-container" />
        <div id="loader">Loading...</div>
      </div>
    );
  }
}

export default Login;
