import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import axios from 'axios';
import {connect} from 'react-redux'
import actions from '../redux/actions/index'
import Feed from './feed.jsx'

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentView: view => dispatch(actions.updateCurrentView(view))
  };
};

const mapStateToProps = state => {
  return {currentView: state.currentView}
}


class ConnectedBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'feed',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClickUpdateView = this.onClickUpdateView.bind(this);
  }

  handleChange(event, index, value) { 
    this.setState({value}) 
  };

  onClickUpdateView (view) {
    this.props.updateCurrentView(view)
  }

  componentDidMount() {
    // axios.get(`http://localhost:1337/${this.state.value}`).then(res => {
    //   console.log(res);
    // }).catch(function(error) {
    //   if (error) {
    //     console.log(error);
    //   }
    // })
  }

  render() {
    return (
      <MuiThemeProvider>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={'feed'} primaryText="Home / Feed" onClick={(() => this.onClickUpdateView(<Feed />))}/>
              <MenuItem value={'explore'} primaryText="Explore" />
              <MenuItem value={'create'} primaryText="Create" />
              <MenuItem value={'account'} primaryText="Account" />
              <MenuItem value={'logout'} primaryText="Logout" />
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
      </MuiThemeProvider>
    );
  }
}

const Bar = connect(mapStateToProps, mapDispatchToProps)(ConnectedBar);

export default Bar