import React from 'react'
import Bar from './Navbar.jsx'
import PostEntry from './PostEntry.jsx'
import axios from 'axios'
import {connect} from 'react-redux'
import Request from './Request.jsx'

class ConnectAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts : [],
      myRequests: []
    }
    this.updateRequestList = this.updateRequestList.bind(this);
  }

  updateRequestList (index) {
    this.state.myRequests.splice(index, 1);
    this.setState({
      myRequests: this.state.myRequests
    })
  }


  componentDidMount() {
    axios.get('/showProfilePage', {
      params: {
        user: this.props.currentUser.displayName
      }
    }).then((results) => {
      this.setState({
        myPosts: results.data
      })
    }).catch((err) => {
      console.log('Error getting all post', err);
    })
    axios.get('/getPendingFollowRequests', {
      params: {
        userName: this.props.currentUser.displayName
      }
    }).then((results) => {
      this.setState({
        myRequests: results.data
      })
    }).catch((err) => {
      console.log('Error getting follow requests,', err);
    })
  }
  
  render() {
    return (
      <div>
        <h1><Bar /></h1>
        <div>
          <h1>
          <ul>
            <li>Area</li>  
            <li>For</li>
            <li>Account</li>
            <li>Changes</li>
          </ul>
          </h1>
          <ul>
            {this.state.myRequests.map((request, i) => 
            <Request updateRequestList={this.updateRequestList} request={request} key={i} index={i}/>)}
          </ul>
        </div>
        <ul>
          {this.state.myPosts.map((post) => <PostEntry post={post} key={post.id}/>)}
        </ul>
      </div>
    )
  }  
}
const mapStateToProps = state => {
  return {currentUser: state.currentUser}
}

const Account = connect(mapStateToProps)(ConnectAccount)

export default Account
