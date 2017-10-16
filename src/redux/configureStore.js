import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import penderMiddleware from 'redux-pender';
import modules from './modules';

const isDevelopment = process.env.NODE_ENV === 'development';

const composeEnhancers = isDevelopment
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

const configureStore = initialState => {
  const store = createStore(
    modules,
    initialState,
    composeEnhancers(applyMiddleware(thunk, penderMiddleware())),
  );

  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
