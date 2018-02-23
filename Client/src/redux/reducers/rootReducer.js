import { combineReducers } from 'redux'
import currentUser from '../reducers/currentUser'
import currentView from '../reducers/currentView'

const rootReducer = combineReducers({
  currentUser,
  currentView
})

export default rootReducer;