import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import events from './events';
import posts from './posts';

export default combineReducers({
  events,
  posts,
  pender: penderReducer
});
