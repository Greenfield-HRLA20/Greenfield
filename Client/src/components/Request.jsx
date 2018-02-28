import React from 'react'
import Bar from './Navbar.jsx'
// import PostEntry from './PostEntry.jsx'
import axios from 'axios'
import {connect} from 'react-redux'

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.respondToRequest = this.respondToRequest.bind(this);
  }


  respondToRequest (e) {
    axios.post('/respondFollow', {
      userId: this.props.request.userId,
      targetId: this.props.request.targetId,
      responseType: e.target.value
    }).then(result => {
      this.props.updateRequestList(this.props.index)
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <li>New follow request from: <strong>{this.props.request.handle}</strong> 
      <button onClick={this.respondToRequest} value="accept">Accept</button> 
      <button onClick={this.respondToRequest} value="deny">Deny</button></li>
    )
  }
}

export default Request