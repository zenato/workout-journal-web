import { combineReducers } from 'redux'
import { penderReducer } from 'redux-pender'
import { reducer as formReducer } from 'redux-form'
import common from './common'
import events from './events'
import posts from './posts'
import users from './users'

export default combineReducers({
  ...common,
  events,
  posts,
  users,
  pender: penderReducer,
  form: formReducer,
})
