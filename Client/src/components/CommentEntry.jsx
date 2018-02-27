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
    this.visitUser = this.visitUser.bind(this);
  }

  visitUser (username) {
    this.props.updateCurrentView(<VisitUserPage visitUsername={username} />)
  }

  render() {
    return (
    <div>
      <a onClick={() => this.visitUser(this.props.comment[0])}>{this.props.comment[0]}: </a>{this.props.comment[1]}
    </div>
    )
  }
  
}

const CommentEntry = connect(mapStateToProps, mapDispatchToProps)(ConnectedCommentEntry)

export default CommentEntry