import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { reducer as formReducer } from 'redux-form'
import preloader from './preloader'
import events from './events'
import posts from './posts'
import users from './users'

export default combineReducers({
  events,
  posts,
  users,
  preloader,
  router: routerReducer,
  loadingBar: loadingBarReducer,
  form: formReducer,
  renderedServer: (state = false) => state,
})
