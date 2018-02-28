export default function urlState(state = '', action) {
  switch (action.type) {
    case 'STORE_URL':
      return (state = state.slice(0, 0).concat(action.payload));
    default:
      return state;
  }
}
