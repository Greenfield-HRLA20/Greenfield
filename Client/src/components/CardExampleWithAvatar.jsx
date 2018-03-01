import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import CommentEntry from './CommentEntry.jsx';
import VisitUserPage from './VisitUserPage.jsx';
import axios from 'axios';
import actions from '../redux/actions/index';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const mapDispatchToProps = dispatch => ({
  updateCurrentView: view => dispatch(actions.updateCurrentView(view)),
});

const mapStateToProps = state => ({ currentUser: state.currentUser });

class ConnectedCardExampleWithAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      likeCount: this.props.post.likeCount,
      expanded: false,
    };
    this.setInput = this.setInput.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.clickLikeButton = this.clickLikeButton.bind(this);
    this.visitUser = this.visitUser.bind(this);
    this.renderCardWithWidth = this.renderCardWithWidth.bind(this);
    this.toggleComments = this.toggleComments.bind(this);
  }

  visitUser(uid, username) {
    console.log('visiting a user!!!!!!!');
    console.log(uid, username);
    this.props.updateCurrentView(<VisitUserPage visitUser={uid} username={username} />);
  }

  setInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitComment() {
    console.log('this should only appear once');
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
        if (result.data === true) {
          this.setState({
            likeCount: this.props.post.likeCount++,
          });
        } else {
          this.setState({
            likeCount: this.props.post.likeCount--,
          });
        }
      })
      .catch((err) => {
        console.log('Error toggling like button ', err);
      });
  }

  toggleComments() {
    console.log('comment toggle button clicked!');
    const currentState = this.state.expanded;
    console.log('current state is:', currentState);
    this.setState({ expanded: !currentState });
  }
  handleExpandChange(expanded) {
    this.setState({ expanded });
  }

  renderCardWithWidth(widthAsPercent) {
    return (
      <Card
        style={{ width: widthAsPercent, marginLeft: 'auto', marginRight: 'auto' }}
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
      >
        <CardHeader
          title={this.props.post.handle}
          onClick={() => this.visitUser(this.props.post.uid, this.props.post.handle)}
        />
        <CardMedia>
          <img src={this.props.post.url} alt="" />
        </CardMedia>
        <CardTitle
          title={this.props.post.caption}
          subtitle={`${this.props.post.likeCount} likes`}
        />

        <CardText expandable style={{ textAlign: 'left' }}>
          <ul>
            {this.props.post.comments.map((comment, i) => (
              <CommentEntry comment={comment} key={i} visitUser={this.visitUser} />
            ))}
          </ul>
        </CardText>

        <TextField
          name="comment"
          value={this.state.comment}
          onChange={this.setInput}
          hintText="Enter your comment here..."
          fullWidth
        />
        <RaisedButton
          label="Submit"
          primary
          style={{ margin: '12' }}
          onClick={this.submitComment}
        />
        <CardActions>
          <FlatButton label="Show/Hide Comments" onClick={this.toggleComments} />
        </CardActions>
      </Card>
    );
  }

  render() {
    const width = window.screen.availWidth;
    if (width > 720) {
      return this.renderCardWithWidth('60%');
    }
    return this.renderCardWithWidth('90%');
    // return (
    // <Card>
    //   <CardHeader title={this.props.post.handle} />
    //   {/* <CardMedia overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}> */}
    //   <CardMedia>
    //     <img src={this.props.post.url} alt="" />
    //   </CardMedia>
    //   <CardTitle
    //     title={this.props.post.caption}
    //     subtitle={`${this.props.post.likeCount} likes`}
    //   />
    //   <CardText>"Here is some text for the post"</CardText>
    //   <CardActions>
    //     <FlatButton label="Show Comments" />
    //   </CardActions>
    // </Card>
    // );
  }
}

const CardExampleWithAvatar = connect(mapStateToProps, mapDispatchToProps)(ConnectedCardExampleWithAvatar);

export default CardExampleWithAvatar;
