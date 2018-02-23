import { combineReducers } from 'redux'
import currentUser from '../reducers/currentUser'
import currentView from '../reducers/currentView'
import currentNav from '../reducers/currentNav'

const rootReducer = combineReducers({
  currentUser,
  currentView,
  currentNav
})

export default rootReducer;