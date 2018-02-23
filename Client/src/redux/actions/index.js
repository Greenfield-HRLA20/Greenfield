export default {
  updateUser : user => ({type: 'UPDATE_USER', payload: user}),
  logoutUser : () => ({type: 'LOGOUT_USER', payload: null}),

  updateCurrentView : view => ({type: 'UPDATE_CURRENT_VIEW', payload: view})
}