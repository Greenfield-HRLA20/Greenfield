import { combineReducers } from 'redux'
import currentUser from '../reducers/currentUser'

const rootReducer = combineReducers({
  currentUser
})

export default rootReducer;