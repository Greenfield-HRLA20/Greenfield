import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionHome from 'material-ui/svg-icons/action/home';
import ExploreIcon from 'material-ui/svg-icons/action/search';
import FaceIcon from 'material-ui/svg-icons/action/face';
import LogoutIcon from 'material-ui/svg-icons/action/eject';
import CreateIcon from 'material-ui/svg-icons/image/add-a-photo';
import auth from '../Firebase';
import { connect } from 'react-redux';
import actions from '../redux/actions/index';
import Feed from './Feed.jsx';
import Explore from './Explore.jsx';
import Create from './Create.jsx';
import Account from './Account.jsx';

const mapDispatchToProps = dispatch => ({
  updateCurrentView: view => dispatch(actions.updateCurrentView(view)),
  logoutUser: () => dispatch(actions.logoutUser()),
  updateNav: string => dispatch(actions.updateNav(string)),
});

const mapStateToProps = state => ({
  currentView: state.currentView,
  currentUser: state.currentUser,
  currentNav: state.currentNav,
});

class ConnectedTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.onClickUpdateView = this.onClickUpdateView.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.firebase
      .auth()
      .signOut()
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    this.props.logoutUser();
    this.props.updateNav('feed');
  }

  onClickUpdateView(value) {
    this.props.updateCurrentView(value);
  }

  componentDidMount() {}

  render() {
    return (
      <MuiThemeProvider>
        <Tabs onChange={this.onClickUpdateView} initialSelectedIndex={-1}>
          <Tab icon={<ActionHome />} value={<Feed />} label="Home" />
          <Tab icon={<ExploreIcon />} label="Explore" value={<Explore />} />
          <Tab icon={<CreateIcon />} label="Create" value={<Create />} />
          <Tab icon={<FaceIcon />} label="Account" value={<Account />} />
          <Tab icon={<LogoutIcon />} label="Logout" value="Logout" onActive={this.logout} />
        </Tabs>
      </MuiThemeProvider>
    );
  }
}

const TabBar = connect(mapStateToProps, mapDispatchToProps)(ConnectedTabBar);

export default TabBar;
