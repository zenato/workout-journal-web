import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import penderMiddleware from 'redux-pender'
import modules from './modules'
import rootSaga from './sagas'

const isDevelopment = process.env.NODE_ENV === 'development'

const composeEnhancers = isDevelopment
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    modules,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware, thunk, penderMiddleware())),
  )

  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules').default
      store.replaceReducer(nextRootReducer)
    })
  }

  sagaMiddleware.run(rootSaga);
  return store
}

export default configureStore
