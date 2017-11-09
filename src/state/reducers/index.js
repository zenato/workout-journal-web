import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { reducer as formReducer } from 'redux-form'
import events from './events'
import posts from './posts'
import users from './users'

export default combineReducers({
  events,
  posts,
  users,
  router: routerReducer,
  loadingBar: loadingBarReducer,
  form: formReducer,
  renderedServer: (state = false) => state,
})
