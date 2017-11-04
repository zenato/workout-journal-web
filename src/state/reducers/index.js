import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import events from './events'
import posts from './posts'
import users from './users'

export default combineReducers({
  events,
  posts,
  users,
  form: formReducer,
})
