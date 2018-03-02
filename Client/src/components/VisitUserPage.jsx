import React from 'react';
import Bar from './Navbar.jsx';
import PostEntry from './PostEntry.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import TabBar from './TabBar.jsx';
import PostCard from './PostCard.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

class ConnectedVisitUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosts: [],
      disableButton: false,
    };
    this.sendFollowRequest = this.sendFollowRequest.bind(this);
    this.checkFollowRelationship = this.checkFollowRelationship.bind(this);
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
        console.log(err);
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
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>
          <TabBar />
        </h1>
        <div style={{ textAlign: 'center' }}>
          <Avatar src={this.props.profilePic} size={200} />
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
}

const mapStateToProps = state => ({ currentUser: state.currentUser });

const VisitUserPage = connect(mapStateToProps)(ConnectedVisitUserPage);

export default VisitUserPage;
