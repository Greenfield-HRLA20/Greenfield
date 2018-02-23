export default {
  updateUser : user => ({type: 'UPDATE_USER', payload: user}),
  logoutUser : () => ({type: 'LOGOUT_USER', payload: null})
}