import React from 'react'
import actions from '../redux/actions/index'
import {connect} from 'react-redux'
import VisitUserPage from './VisitUserPage.jsx';

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentView: view => dispatch(actions.updateCurrentView(view))
  };
};

const mapStateToProps = state => {
  return {currentView: state.currentView}
}

class ConnectedCommentEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <a onClick={() => this.props.visitUser(this.props.comment[0])}>{this.props.comment[0]}: </a>{this.props.comment[1]}
    </div>
    )
  }
  
}

const CommentEntry = connect(mapStateToProps, mapDispatchToProps)(ConnectedCommentEntry)

export default CommentEntry