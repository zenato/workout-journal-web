import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from './sagas'

const composeEnhancers =
  (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) ||
  compose

const configureStore = (initialState, history) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history))),
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore
