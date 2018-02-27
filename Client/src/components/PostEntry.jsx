import React from 'react'
import CommentEntry from './CommentEntry.jsx'
import axios from 'axios'
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {currentUser: state.currentUser}
} 

class ConnectedPostEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      likeCount: this.props.post.likeCount
    }
    this.setInput = this.setInput.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.clickLikeButton = this.clickLikeButton.bind(this);
  }

  setInput (e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitComment () {
    let handle = this.props.currentUser.displayName
    let comment = this.state.comment
    axios.post('/addComment', {
      handle: handle,
      postId: this.props.post.id,
      comment: this.state.comment
    }).then((result) => {
      console.log('this is from the server', result)
      this.props.post.comments.push([handle, comment])
      this.setState({
        comment: ''
      })
    }).catch((err) => {
      console.log('Error submitting post ', err);
    })
  }

  clickLikeButton () {
    let handle = this.props.currentUser.displayName;
    let postId = this.props.post.id;
    axios.post('/toggleLike', {
      handle: handle,
      postId: postId
    }).then((result) => {
      console.log('Successfully toggled like! ', result);
      console.log(this.props.post)
      if (result.data === true) {
        this.setState({
          likeCount: this.props.post.likeCount++
        })
      } else {
        this.setState({
          likeCount: this.props.post.likeCount--
        })
      }
    }).catch((err) => {
      console.log('Error toggling like button ', err);
    })
  }

  render() {
    return (
    <div>
      <div><a href="#"> {this.props.post.handle} </a> </div>
      {this.props.post.mediaType === 'image/jpeg' &&
        <img src= {this.props.post.url}/>
      }

      {this.props.post.mediaType === 'video/mp4' &&
        <video width="200" height="200" controls controlsList="nodownload">
          <source src={this.props.post.url} type="video/mp4"/>
        </video>
      }
      <div><button onClick={this.clickLikeButton}>{this.props.post.likeCount} likes</button></div>
      <div><strong>{this.props.post.caption}</strong></div>
      <ul>
        {this.props.post.comments.map((comment, i) => <CommentEntry comment={comment} key={i} />)}
      </ul>
      <input type="text" name="comment" value={this.state.comment} onChange={this.setInput} placeholder="Add Comment" />
      <button onClick={this.submitComment} >Submit</button>
    </div>
    )
  }
}

const PostEntry = connect(mapStateToProps)(ConnectedPostEntry)

export default PostEntry