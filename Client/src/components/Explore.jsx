import React from 'react';
import Bar from './Navbar.jsx';
import PostEntry from './PostEntry.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import CardExampleWithAvatar from './CardExampleWithAvatar.jsx';

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
          <Bar />
        </h1>
        <ul>
          {this.state.allPosts.map(post => (
            <div>
              <CardExampleWithAvatar post={post} key={post.id} />
              {/* <PostEntry post={post} key={post.id} /> */}
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
<<<<<<< HEAD
const mapStateToProps = state => ({ currentUser: state.currentUser });
=======

const mapStateToProps = state => {
  return { currentUser: state.currentUser };
};
>>>>>>> commit for rebase

const Explore = connect(mapStateToProps)(ConnectedExplore);

export default Explore;
