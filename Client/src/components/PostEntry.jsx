import React from 'react';
import CommentEntry from './CommentEntry.jsx';
import VisitUserPage from './VisitUserPage.jsx';
import axios from 'axios';
import actions from '../redux/actions/index';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentView: view => dispatch(actions.updateCurrentView(view))
  };
};

const mapStateToProps = state => {
  return { currentUser: state.currentUser };
};

class ConnectedPostEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      likeCount: this.props.post.likeCount
    };
    this.setInput = this.setInput.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.clickLikeButton = this.clickLikeButton.bind(this);
    this.visitUser = this.visitUser.bind(this);
  }

  visitUser(uid, username) {
    this.props.updateCurrentView(
      <VisitUserPage visitUser={uid} username={username} />
    );
  }

  setInput(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitComment() {
    let uid = this.props.currentUser.uid;
    let comment = this.state.comment;
    let handle = this.props.currentUser.displayName;
    axios
      .post('/addComment', {
        uid: uid,
        postId: this.props.post.id,
        comment: this.state.comment
      })
      .then(result => {
        this.props.post.comments.push([handle, uid, comment]);
        this.setState({
          comment: ''
        });
      })
      .catch(err => {
        console.log('Error submitting post ', err);
      });
  }

  clickLikeButton() {
    let uid = this.props.currentUser.uid;
    let postId = this.props.post.id;
    axios
      .post('/toggleLike', {
        uid: uid,
        postId: postId
      })
      .then(result => {
        if (result.data === true) {
          this.setState({
            likeCount: this.props.post.likeCount++
          });
        } else {
          this.setState({
            likeCount: this.props.post.likeCount--
          });
        }
      })
      .catch(err => {
        console.log('Error toggling like button ', err);
      });
  }

  render() {
    return (
      <div>
        <div>
          <a
            onClick={() =>
              this.visitUser(this.props.post.uid, this.props.post.handle)
            }
          >
            {' '}
            {this.props.post.handle}{' '}
          </a>{' '}
        </div>
        {this.props.post.mediaType === 'image/jpeg' && (
          <img src={this.props.post.url} />
        )}

        {this.props.post.mediaType === 'video/mp4' && (
          <video width="200" height="200" controls controlsList="nodownload">
            <source src={this.props.post.url} type="video/mp4" />
          </video>
        )}
        <div>
          <button onClick={this.clickLikeButton}>
            {this.props.post.likeCount} likes
          </button>
        </div>
        <div>
          <strong>{this.props.post.caption}</strong>
        </div>
        <ul>
          {this.props.post.comments.map((comment, i) => (
            <CommentEntry
              comment={comment}
              key={i}
              visitUser={this.visitUser}
            />
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

const PostEntry = connect(mapStateToProps, mapDispatchToProps)(
  ConnectedPostEntry
);

export default PostEntry;
