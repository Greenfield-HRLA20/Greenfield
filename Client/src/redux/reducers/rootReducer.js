import { combineReducers } from 'redux';
import currentUser from '../reducers/currentUser';
import currentView from '../reducers/currentView';
import currentNav from '../reducers/currentNav';
import urlState from '../reducers/urlState';

const rootReducer = combineReducers({
  currentUser,
  currentView,
  currentNav,
  urlState,
});

export default rootReducer;
