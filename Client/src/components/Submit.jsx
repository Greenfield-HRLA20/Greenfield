import React from 'react';
import Bar from './Navbar.jsx';
import Feed from './Feed.jsx';
import {connect} from 'react-redux';
import actions from '../redux/actions/index';
import axios from 'axios';

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentView: view => dispatch(actions.updateCurrentView(view)),
    updateNav: string => dispatch(actions.updateNav(string))
  };
};

const mapStateToProps = state => {
  return {currentView: state.currentView,
          currentUser: state.currentUser,
          currentNav: state.currentNav,
          urlState: state.urlState
        }
}

class ConnectedSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
    }
    this.setInput = this.setInput.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }

  setInput (e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
  }

  submitPost() {
    console.log('axios time!');

    axios.post('/submitPost', {
      handle: this.props.currentUser.displayName, 
      caption: this.state.caption, 
      postUrl: this.props.urlState
    })
    .then((result) => {
      console.log(result);
      this.props.updateCurrentView(<Feed />);
      this.props.updateNav('feed');
      // redirect to feed page
    })
    .catch((err) => {
      console.log('Error submitting post', err)
    });
    // 
  }

  render() {
    return (
      <div>
        <h1><Bar /></h1>
        <h1>Submit page!!!!</h1>
        <img src={this.props.urlState} alt="" />
        <div>
          Enter your caption here! <input type="text" name="caption" onChange={(e) => this.setInput(e)}/>
          <input type="submit" value="Submit" onClick={this.submitPost} />
        </div>
      </div>

    );
  }
}

const Submit = connect(mapStateToProps, mapDispatchToProps)(ConnectedSubmit);

export default Submit