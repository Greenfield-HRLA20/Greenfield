import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import axios from 'axios';

const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};

class LikeCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.updateCheck = this.updateCheck.bind(this);
    this.checkLikeStatus = this.checkLikeStatus.bind(this);
  }

  updateCheck() {
    this.setState({
      checked: !this.state.checked
    });
  }

  checkLikeStatus() {
    const userUid = this.props.uid;
    const postId = this.props.postId;
    axios
      .get('/getLikeStatus', {
        params: {
          userUid,
          postId
        }
      })
      .then(result => {
        this.setState({ checked: result.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.checkLikeStatus();
  }

  render() {
    return (
      <div style={styles.block}>
        <Checkbox
          onCheck={this.updateCheck}
          checked={this.state.checked}
          iconStyle={{ fill: 'rgb(240,71,88)' }}
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          style={styles.checkbox}
        />
      </div>
    );
  }
}

export default LikeCheckbox;
