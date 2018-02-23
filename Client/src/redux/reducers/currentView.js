
export default function currentView(state = [], action) {
  switch (action.type) {
    case 'UPDATE_CURRENT_VIEW':
      return state = state.slice(1).concat(action.payload)
    default:
      return state;
  }
}