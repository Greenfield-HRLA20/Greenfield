import React from 'react'
import Bar from './Navbar.jsx'
import PostEntry from './PostEntry.jsx'
import axios from 'axios'
import {connect} from 'react-redux'

class ConnectedVisitUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosts : [],
      disableButton: false
    }
    this.sendFollowRequest = this.sendFollowRequest.bind(this);
    this.checkFollowRelationship = this.checkFollowRelationship.bind(this);
  }

  componentDidMount() {
    this.getPost(this.props.visitUsername)
    this.checkFollowRelationship();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visitUsername !== nextProps.visitUsername) {
      this.getPost(nextProps.visitUsername)
      this.checkFollowRelationship();
    }
  }
  
  getPost(username) {
    axios.get('/showProfilePage', {
      params: {
        user: username
      }
    }).then((results) => {
      this.setState({
        userPosts: results.data
      })
    }).catch((err) => {
      console.log('Error getting all post', err);
    })
  }

  sendFollowRequest() {
    axios.post('/requestFollow', {
      userName: this.props.currentUser.displayName,
      targetUserName: this.props.visitUsername,
    })
    .then((results) => {
      this.setState({
        disableButton: true
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  checkFollowRelationship () {
    axios.get('/checkFollowRelationship', {
      params: {
        userName: this.props.currentUser.displayName,
        targetUserName: this.props.visitUsername,
      }
    })
    .then((results) => {
      if(results.data) {
        this.setState({
          disableButton: true
        })
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <h1><Bar /></h1>
        <h1>{`THIS IS ${this.props.visitUsername}'S PAGE`}</h1>
        <div>
          <button disabled={this.state.disableButton} onClick={this.sendFollowRequest}>Follow</button>
        </div>
        <ul>
          {this.state.userPosts.map((post) => <PostEntry post={post} key={post.id}/>)}
        </ul>
      </div>
    )
  }  
}

const mapStateToProps = state => {
  return {currentUser: state.currentUser}
}

const VisitUserPage = connect(mapStateToProps)(ConnectedVisitUserPage)

export default VisitUserPage