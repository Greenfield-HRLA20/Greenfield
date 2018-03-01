import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './components/Feed.jsx';
import Login from './components/Login.jsx';
import auth from './Firebase';
import { Provider, connect } from 'react-redux';
import store from './redux';
import actions from './redux/actions/index';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(actions.updateUser(user)),
  updateCurrentView: view => dispatch(actions.updateCurrentView(view))
});

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  currentView: state.currentView
});

class ConnectedMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.authSubscription = auth.firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loading: false
      });
      if (user) {
        this.props.updateUser(user);
        axios.post('/addUser', {
          uid: user.uid,
          handle: user.displayName
        });
        this.props.updateCurrentView(<Feed />);
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
      return this.props.currentView;
    }
    return <Login />;
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(ConnectedMain);

const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Main />
    </MuiThemeProvider>
  </Provider>,
  app
);
