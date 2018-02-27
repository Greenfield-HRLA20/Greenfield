import React from 'react'
import Bar from './Navbar.jsx'
import PostEntry from './PostEntry.jsx'
import axios from 'axios'
import {connect} from 'react-redux'

class ConnectAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts : []
    }
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