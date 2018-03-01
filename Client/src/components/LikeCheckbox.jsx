import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class LikeCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: null,
    };
    this.updateCheck = this.updateCheck.bind(this);
  }

  updateCheck() {
    this.setState(oldState => ({
      checked: !oldState.checked,
    }));
  }

  render() {
    return (
      <div style={styles.block}>
        <Checkbox
          onCheck={this.updateCheck}
          checked={this.state.checked}
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          style={styles.checkbox}
        />
      </div>
    );
  }
}

export default LikeCheckbox;
