import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TabBar from './TabBar.jsx';
import PostCard from './PostCard.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';

class ConnectedVisitUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosts: [],
      disableButton: false,
      loading: true,
    };
    this.sendFollowRequest = this.sendFollowRequest.bind(this);
    this.checkFollowRelationship = this.checkFollowRelationship.bind(this);
    this.checkLoading = this.checkLoading.bind(this);
  }

  componentDidMount() {
    this.getPost(this.props.visitUser);
    this.checkFollowRelationship(this.props.visitUser);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visitUser !== nextProps.visitUser) {
      this.getPost(nextProps.visitUser);
      this.checkFollowRelationship(nextProps.visitUser);
    }
  }

  getPost(uid) {
    axios
      .get('/showProfilePage', {
        params: {
          user: uid,
        },
      })
      .then((results) => {
        this.setState({
          userPosts: results.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log('Error getting all post', err);
      });
  }

  sendFollowRequest() {
    axios
      .post('/requestFollow', {
        userUid: this.props.currentUser.uid,
        targetUserUid: this.props.visitUser,
      })
      .then((results) => {
        this.setState({
          disableButton: true,
        });
      })
      .catch((err) => {
        console.log('Error sending follow request', err);
      });
  }

  checkFollowRelationship(visitUser) {
    axios
      .get('/checkFollowRelationship', {
        params: {
          userUid: this.props.currentUser.uid,
          targetUid: visitUser,
        },
      })
      .then((results) => {
        if (results.data) {
          this.setState({
            disableButton: true,
          });
        } else {
          this.setState({
            disableButton: false,
          });
        }
      })
      .catch((err) => {
        console.log('Error checking follow relationship', err);
      });
  }

  checkLoading() {
    if (this.state.loading) {
      return (
        <div align="center" style={{ marginTop: '20%' }}>
          <CircularProgress size={80} thickness={5} />
        </div>
      );
    }
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <div align="center" style={{ height: 250, position: 'relative', paddingTop: '15px' }}>
            <Avatar src={this.props.profilePic} size={200} />
          </div>
          <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>{this.props.username}</h1>
          <RaisedButton
            label="Request to Follow"
            primary
            style={{ margin: '12' }}
            disabled={this.state.disableButton}
            onClick={this.sendFollowRequest}
          />
        </div>
        <ul>{this.state.userPosts.map(post => <PostCard post={post} key={post.id} />)}</ul>
      </div>
    );
  }

  render() {
    return <div>{this.checkLoading()}</div>;
  }
}

const mapStateToProps = state => ({ currentUser: state.currentUser });

const VisitUserPage = connect(mapStateToProps)(ConnectedVisitUserPage);

export default VisitUserPage;
