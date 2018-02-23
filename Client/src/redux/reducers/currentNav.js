export default function currentNav(state = 'feed', action) {
  switch (action.type) {
    case 'UPDATE_NAV':
      return state = state.slice(10).concat(action.payload)
    default:
      return state;
  }
}