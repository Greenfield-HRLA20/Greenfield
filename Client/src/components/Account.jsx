import React from 'react';
import axios from 'axios';
import auth from '../Firebase';
import { connect } from 'react-redux';
import actions from '../redux/actions/index';
import Request from './Request.jsx';
import TabBar from './TabBar.jsx';
import PostCard from './PostCard.jsx';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';

class ConnectAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts: [],
      myRequests: [],
      wantUpdate: false,
      photoURL: '',
      displayName: '',
      newPassword: '',
      loading: true,
    };
    this.updateRequestList = this.updateRequestList.bind(this);
    this.setInput = this.setInput.bind(this);
    this.updateField = this.updateField.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.checkLoading = this.checkLoading.bind(this);
  }

  updateRequestList(index) {
    this.state.myRequests.splice(index, 1);
    this.setState({
      myRequests: this.state.myRequests,
    });
  }

  setInput(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  componentDidMount() {
    axios
      .get('/showProfilePage', {
        params: {
          user: this.props.currentUser.uid,
        },
      })
      .then((results) => {
        this.setState({
          myPosts: results.data,
          loading: false
        });
      })
      .catch((err) => {
        console.log('Error getting all post', err);
      });
    axios
      .get('/getPendingFollowRequests', {
        params: {
          userName: this.props.currentUser.uid,
        },
      })
      .then((results) => {
        this.setState({
          myRequests: results.data,
        });
      })
      .catch((err) => {
        console.log('Error getting follow requests,', err);
      });
  }

  updateProfile() {
    const user = auth.firebase.auth().currentUser;
    if (this.state.photoURL !== '') {
      user
        .updateProfile({
          photoURL: this.state.photoURL,
        })
        .then(() => {
          axios
            .put('/updateProfilePic', {
              uid: this.props.currentUser.uid,
              photoURL: this.state.photoURL,
            })
            .then(() => {
              this.setState({
                photoURL: '',
              });
            });
          this.props.updateUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (this.state.displayName !== '') {
      user
        .updateProfile({
          displayName: this.state.displayName,
        })
        .then(() => {
          axios
            .put('/updateUsername', {
              uid: this.props.currentUser.uid,
              displayName: this.state.displayName,
            })
            .then(() => {
              this.setState({
                displayName: '',
              });
            });
          this.props.updateUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (this.state.newPassword !== '') {
      user
        .updatePassword(this.state.newPassword)
        .then(() => {
          this.setState({
            newPassword: '',
          });
          this.props.updateUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.setState({
      wantUpdate: false,
    });
  }

  updateField() {
    if (this.state.wantUpdate) {
      return (
        <div align="center" style={{ backgroundColor: 'white', padding: '10px' }}>
          <div>
            <TextField
              name="photoURL"
              onChange={this.setInput}
              floatingLabelText="Enter New Photo Url"
            />
          </div>
          <div>
            <TextField
              name="displayName"
              onChange={this.setInput}
              floatingLabelText="Enter New Display Name"
            />
          </div>
          <div>
            <TextField
              name="newPassword"
              onChange={this.setInput}
              floatingLabelText="Enter New Password"
              type="password"
            />
            <br />
          </div>
          <div>
            <RaisedButton
              label="Submit"
              primary
              onClick={this.updateProfile}
              style={{ margin: '10', paddingRight: '5px' }}
            />
            <RaisedButton
              label="Cancel"
              secondary
              onClick={() => this.setState({ wantUpdate: false })}
              style={{ margin: '10' }}
            />
          </div>
        </div>
      );
    }
    return (
      <div align="center">
        <RaisedButton
          label="Update Profile"
          primary
          onClick={() => this.setState({ wantUpdate: true })}
          style={{ margin: '7' }}
        />
      </div>
    );
  }

  checkLoading() {
    if (this.state.loading) {
      return (
        <div align="center" style={{ marginTop: '20%' }}>
          <CircularProgress size={80} thickness={5} />
        </div>
      );
    } else {
    return (
      <div>
        <div align="center" style={{ height: 250, position: 'relative', paddingTop: '15px' }}>
          <Avatar src={this.props.currentUser.photoURL} size={200} />
        </div>
        {this.updateField()}
        <br />
        <div style={{ textAlign: 'center' }}>
          {this.state.myRequests.map((request, i) => (
            <Request
              updateRequestList={this.updateRequestList}
              request={request}
              key={i}
              index={i}
            />
          ))}
        </div>
        <ul>{this.state.myPosts.map(post => <PostCard post={post} key={post.id} />)}</ul>
      </div>
    );
  }
  }

  render() {
    return <div>{this.checkLoading()}</div>;
  }
}
const mapStateToProps = state => ({ currentUser: state.currentUser });

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(actions.updateUser(user)),
});

const Account = connect(mapStateToProps, mapDispatchToProps)(ConnectAccount);

export default Account;
