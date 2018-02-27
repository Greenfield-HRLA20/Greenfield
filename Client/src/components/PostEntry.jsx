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
      comment: ''
    }
    this.setInput = this.setInput.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  setInput (e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitComment () {
    let handle = this.props.currentUser.displayName;
    axios.post('/addComment', {
      handle: handle,
      postId: this.props.post.id,
      comment: this.state.comment
    }).then((result) => {
      console.log('this is from the server', result)
      this.props.post.comments.push([handle, this.state.comment])
      this.setState({
        comment: ''
      })
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
      
      <div>{this.props.post.caption}</div>
      <div>{this.props.post.likeCount}</div>
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