export default function currentView(state = null, action) {
  switch (action.type) {
    case 'UPDATE_CURRENT_VIEW':
      return state.currentView = action.payload;
    default:
      return state;
  }
}