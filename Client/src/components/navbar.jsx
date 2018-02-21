import React from 'react';
// import IconMenu from 'material-ui/IconMenu';
// import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

export default class Bar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  handleChange(event, index, value) { 
    this.setState({value}) 
  };

  render() {
    return (
      <MuiThemeProvider>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={1} primaryText="Home / Feed" />
              <MenuItem value={2} primaryText="Explore" />
              <MenuItem value={3} primaryText="Create" />
              <MenuItem value={4} primaryText="Account" />
              <MenuItem value={5} onClick={this.props.logout} primaryText="Logout" />
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
      </MuiThemeProvider>
    );
  }
}