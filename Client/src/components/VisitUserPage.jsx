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
  }

  componentDidMount() {

    axios.get('/showProfilePage', {
      params: {
        user: this.props.visitUsername
      }
    }).then((results) => {
      this.setState({
        userPosts: results.data
      })
    }).catch((err) => {
      console.log('Error getting all post', err);
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visitUsername !== nextProps.visitUsername) {
      console.log('runs this')
    }
  }
  
  render() {
    return (
      <div>
        <h1><Bar /></h1>
        <h1>{`THIS IS ${this.props.visitUsername}'S PAGE`}</h1>
        <div>
          <button disabled={this.state.disableButton}>Follow</button>
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