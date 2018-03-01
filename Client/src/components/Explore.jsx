import React from 'react';
import Bar from './Navbar.jsx';
import PostEntry from './PostEntry.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import PostCard from './PostCard.jsx';
import TabBar from './TabBar.jsx';

class ConnectedExplore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
    };
  }
  componentDidMount() {
    axios
      .get('/showExplorePage')
      .then((results) => {
        this.setState({
          allPosts: results.data,
        });
      })
      .catch((err) => {
        console.log('Error getting all post', err);
      });
  }

  render() {
    return (
      <div>
        <h1>
          <TabBar />
        </h1>
        <ul>
          {this.state.allPosts.map(post => (
            <div>
              <PostCard post={post} key={post.id} />
              {/* <PostEntry post={post} key={post.id} /> */}
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({ currentUser: state.currentUser });

const Explore = connect(mapStateToProps)(ConnectedExplore);

export default Explore;
