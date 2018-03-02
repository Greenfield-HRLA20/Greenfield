import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
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

class ConnectedBar extends React.Component {
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

  onClickUpdateView(view, value) {
    this.props.updateCurrentView(view);
    this.props.updateNav(value);
  }

  componentDidMount() {}

  render() {
    return (
      <MuiThemeProvider>
        <Toolbar>
          <ToolbarGroup firstChild>
            <DropDownMenu value={this.props.currentNav}>
              <MenuItem
                value="feed"
                primaryText="Home / Feed"
                onClick={() => this.onClickUpdateView(<Feed />, 'feed')}
              />
              <MenuItem
                value="explore"
                primaryText="Explore"
                onClick={() => this.onClickUpdateView(<Explore />, 'explore')}
              />
              <MenuItem
                value="create"
                primaryText="Create"
                onClick={() => this.onClickUpdateView(<Create />, 'create')}
              />
              <MenuItem
                value="account"
                primaryText="Account"
                onClick={() => this.onClickUpdateView(<Account />, 'account')}
              />
              <MenuItem value="logout" primaryText="Logout" onClick={this.logout} />
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
      </MuiThemeProvider>
    );
  }
}

const Bar = connect(mapStateToProps, mapDispatchToProps)(ConnectedBar);

export default Bar;
