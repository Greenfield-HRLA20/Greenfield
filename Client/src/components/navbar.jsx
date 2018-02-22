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

export default class Bar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '/',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) { 
    console.log('clicked', event, index, value) 
    this.setState({value}, console.log(this.state)) 
  };

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
              <MenuItem value={'<Feed />'} primaryText="Home / Feed" />
              <MenuItem value={'/explore'} primaryText="Explore" />
              <MenuItem value={'/create'} primaryText="Create" />
              <MenuItem value={'/account'} primaryText="Account" />
              <MenuItem value={'/logout'} primaryText="Logout" />
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
      </MuiThemeProvider>
    );
  }
}