import React from 'react';
import Bar from './Navbar.jsx';
import PostEntry from './PostEntry.jsx';
import axios from 'axios';
import { connect } from 'react-redux';

class ConnectedVisitUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosts: [],
      disableButton: false
    };
    this.sendFollowRequest = this.sendFollowRequest.bind(this);
    this.checkFollowRelationship = this.checkFollowRelationship.bind(this);
  }

  componentDidMount() {
    this.getPost(this.props.visitUser);
    this.checkFollowRelationship();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visitUser !== nextProps.visitUser) {
      this.getPost(nextProps.visitUser);
      this.checkFollowRelationship();
    }
  }

  getPost(uid) {
    axios
      .get('/showProfilePage', {
        params: {
          user: uid
        }
      })
      .then(results => {
        this.setState({
          userPosts: results.data
        });
      })
      .catch(err => {
        console.log('Error getting all post', err);
      });
  }

  sendFollowRequest() {
    axios
      .post('/requestFollow', {
        userUid: this.props.currentUser.uid,
        targetUserUid: this.props.visitUser
      })
      .then(results => {
        this.setState({
          disableButton: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  checkFollowRelationship() {
    axios
      .get('/checkFollowRelationship', {
        params: {
          userUid: this.props.currentUser.uid,
          targetUid: this.props.visitUser
        }
      })
      .then(results => {
        if (results.data) {
          this.setState({
            disableButton: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>
          <Bar />
        </h1>
        <h1>{`THIS IS ${this.props.username}'S PAGE`}</h1>
        <div>
          <button
            disabled={this.state.disableButton}
            onClick={this.sendFollowRequest}
          >
            Follow
          </button>
        </div>
        <ul>
          {this.state.userPosts.map(post => (
            <PostEntry post={post} key={post.id} />
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { currentUser: state.currentUser };
};

const VisitUserPage = connect(mapStateToProps)(ConnectedVisitUserPage);

export default VisitUserPage;
