export default function currentUser(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_USER':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}