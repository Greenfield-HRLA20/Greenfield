export default function currentUser(state = null, action) {
  switch (action.type) {
    case 'UPDATE_USER':
      return Object.assign({}, state, action.payload);
    case 'LOGOUT_USER':
      return (state.currentUser = action.payload);
    default:
      return state;
  }
}
