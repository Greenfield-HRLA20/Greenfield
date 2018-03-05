import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.respondToRequest = this.respondToRequest.bind(this);
  }

  respondToRequest(value) {
    axios
      .post('/respondFollow', {
        userId: this.props.request.userId,
        targetId: this.props.request.targetId,
        responseType: value
      })
      .then(result => {
        this.props.updateRequestList(this.props.index);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div style={{ fontFamily: 'Roboto, sans-serif' }}>
        <div style={{ marginBottom: '5px' }}>
          New follow request from: <strong>{this.props.request.handle}</strong>
        </div>
        <RaisedButton
          label="Accept"
          primary
          onClick={() => this.respondToRequest('accept')}
          style={{ margin: '8', paddingRight: '5px' }}
        />
        <RaisedButton
          label="Deny"
          secondary
          onClick={() => this.respondToRequest('deny')}
          style={{ margin: '8' }}
        />
        <br />
        <br />
      </div>
    );
  }
}

export default Request;
