import React from 'react';
import CommentEntry from './CommentEntry.jsx';
import VisitUserPage from './VisitUserPage.jsx';
import axios from 'axios';
import actions from '../redux/actions/index';
import { connect } from 'react-redux';
import LikeCheckbox from './LikeCheckbox.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const mapDispatchToProps = dispatch => ({
  updateCurrentView: view => dispatch(actions.updateCurrentView(view)),
});

const mapStateToProps = state => ({ currentUser: state.currentUser });

class ConnectedPostEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      likeCount: this.props.post.likeCount,
    };
    this.setInput = this.setInput.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.clickLikeButton = this.clickLikeButton.bind(this);
    this.visitUser = this.visitUser.bind(this);
  }

  visitUser(uid, username) {
    this.props.updateCurrentView(<VisitUserPage visitUser={uid} username={username} />);
  }

  setInput(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitComment() {
    const uid = this.props.currentUser.uid;
    const comment = this.state.comment;
    const handle = this.props.currentUser.displayName;
    axios
      .post('/addComment', {
        uid,
        postId: this.props.post.id,
        comment: this.state.comment,
      })
      .then((result) => {
        this.props.post.comments.push([handle, uid, comment]);
        this.setState({
          comment: '',
        });
      })
      .catch((err) => {
        console.log('Error submitting post ', err);
      });
  }

  clickLikeButton() {
    const uid = this.props.currentUser.uid;
    const postId = this.props.post.id;
    axios
      .post('/toggleLike', {
        uid,
        postId,
      })
      .then((result) => {
          });
        } else {
          this.setState({
            likeCount: this.props.post.likeCount--,
          });
      })
      .catch((err) => {
        console.log('Error toggling like button ', err);
      });
  }

  render() {
    return (
      <div>
        <div>
          <a onClick={() => this.visitUser(this.props.post.uid, this.props.post.handle)}>
            {' '}
            {this.props.post.handle}{' '}
          </a>{' '}
        </div>
        {this.props.post.mediaType.includes('image') && <img src={this.props.post.url} />}

        {this.props.post.mediaType === 'video/mp4' && (
          <video width="200" height="200" controls controlsList="nodownload">
            <source src={this.props.post.url} type="video/mp4" />
          </video>
        )}
        <div>
          <div onClick={this.clickLikeButton}>
            <LikeCheckbox likeStatus={this.state.likeStatus} />
          </div>
          {this.props.post.likeCount} likes
        </div>
        <div>
          <strong>{this.props.post.caption}</strong>
        </div>
        <ul>
          {this.props.post.comments.map((comment, i) => (
            <CommentEntry comment={comment} key={i} visitUser={this.visitUser} />
          ))}
        </ul>
        <input
          type="text"
          name="comment"
          value={this.state.comment}
          onChange={this.setInput}
          placeholder="Add Comment"
        />
        <button onClick={this.submitComment}>Submit</button>
      </div>
    );
  }
}

const PostEntry = connect(mapStateToProps, mapDispatchToProps)(ConnectedPostEntry);

export default PostEntry;
