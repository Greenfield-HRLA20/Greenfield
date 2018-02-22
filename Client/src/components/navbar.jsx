import React from 'react';
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
  }

  handleChange(event, index, value) { 
    this.setState({value}) 
  };

  componentDidMount() {
    axios.get(`http://localhost:1337/${this.state.value}`).then(res => {
      console.log(res);
    }).catch(function(error) {
      if (error) {
        console.log(error);
      }
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={'/'} primaryText="Home / Feed" />
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