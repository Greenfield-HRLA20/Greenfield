import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CommentEntry from './CommentEntry.jsx';
import VisitUserPage from './VisitUserPage.jsx';
import axios from 'axios';
import actions from '../redux/actions/index';
import { connect } from 'react-redux';

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
    };
    this.setInput = this.setInput.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.clickLikeButton = this.clickLikeButton.bind(this);
    this.visitUser = this.visitUser.bind(this);
    this.renderCardWithWidth = this.renderCardWithWidth.bind(this);
  }

  visitUser(uid, username) {
    console.log('visiting a user!!!!!!!');
    console.log(uid, username);
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

  renderCardWithWidth(widthAsPercent) {
    return (
      <Card style={{ width: widthAsPercent, marginLeft: 'auto', marginRight: 'auto' }}>
        <CardHeader
          title={this.props.post.handle}
          onClick={() => this.visitUser(this.props.post.uid, this.props.post.handle)}
        />
        {/* <CardMedia overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}> */}
        <CardMedia>
          <img src={this.props.post.url} alt="" />
        </CardMedia>
        <CardTitle
          title={this.props.post.caption}
          subtitle={`${this.props.post.likeCount} likes`}
        />
        <CardText>"Here is some text for the post"</CardText>
        <CardActions>
          <FlatButton label="Show Comments" />
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
