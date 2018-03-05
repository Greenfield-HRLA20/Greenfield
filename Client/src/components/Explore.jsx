import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PostCard from './PostCard.jsx';
import TabBar from './TabBar.jsx';
import CircularProgress from 'material-ui/CircularProgress';

class ConnectedExplore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      loading: true,
    };
    this.checkLoading = this.checkLoading.bind(this);
  }
  componentDidMount() {
    axios
      .get('/showExplorePage')
      .then((results) => {
        this.setState({
          allPosts: results.data,
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
      <ul>
        {this.state.allPosts.map(post => (
          <div>
            <PostCard post={post} key={post.id} />
          </div>
        ))}
      </ul>
    );
  }

  render() {
    return <div>{this.checkLoading()}</div>;
  }
}
const mapStateToProps = state => ({ currentUser: state.currentUser });

const Explore = connect(mapStateToProps)(ConnectedExplore);

export default Explore;
