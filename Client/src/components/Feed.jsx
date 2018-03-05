import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TabBar from './TabBar.jsx';
import PostCard from './PostCard.jsx';
import CircularProgress from 'material-ui/CircularProgress';

const mapStateToProps = state => ({ currentUser: state.currentUser });

class ConnectedFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedPosts: [],
      loading: true,
    };
    this.checkLoading = this.checkLoading.bind(this);
  }

  componentDidMount() {
    axios
      .get('/showFeedPage', {
        params: {
          user: this.props.currentUser.uid,
        },
      })
      .then((results) => {
        this.setState({
          feedPosts: results.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log('Error getting all post', err);
      });
  }

  checkLoading() {
    if (this.state.loading) {
      return (
        <div align="center" style={{ marginTop: '20%' }}>
          <CircularProgress size={80} thickness={5} />
        </div>
      );
    }
    return (
      <div>
        <ul>{this.state.feedPosts.map(post => <PostCard post={post} key={post.id} />)}</ul>
      </div>
    );
  }

  render() {
    return <div>{this.checkLoading()}</div>;
  }
}

const Feed = connect(mapStateToProps)(ConnectedFeed);

export default Feed;
