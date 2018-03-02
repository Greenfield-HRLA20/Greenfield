import React from 'react';
import actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';

const mapDispatchToProps = dispatch => ({
  updateCurrentView: view => dispatch(actions.updateCurrentView(view)),
});

const mapStateToProps = state => ({ currentView: state.currentView });

class ConnectedSingleComment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListItem
        primaryText={this.props.comment[0]}
        secondaryText={<p>{this.props.comment[2]}</p>}
        secondaryTextLines={1}
        onClick={() => this.props.visitUser(this.props.comment[1], this.props.comment[0])}
      />
    );
  }
}

const SingleComment = connect(mapStateToProps, mapDispatchToProps)(ConnectedSingleComment);

export default SingleComment;
