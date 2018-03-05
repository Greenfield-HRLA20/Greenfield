import React from 'react';
import auth from '../Firebase';
import CircularProgress from 'material-ui/CircularProgress';

class Login extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    auth.ui.start('#firebaseui-auth-container', auth.uiConfig);
  }

  render() {
    return (
      <div align="center" style={{ marginTop: '10%' }}>
        <img src="http://www.cufonfonts.com/site/makeimage?type=custom&text=Hackergram&size=100&id=20488" />
        <div id="firebaseui-auth-container" />
        <div id="loader">
          <CircularProgress size={80} thickness={5} />
        </div>
      </div>
    );
  }
}

export default Login;
