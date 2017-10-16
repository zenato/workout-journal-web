import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Cookies from 'js-cookie';
import registerServiceWorker from './registerServiceWorker';
import configureStore from 'redux/configureStore';
import Root from './client/Root';
import './index.scss';

if (!window.__PRELOADED_STATE__) {
  const accessToken = Cookies.get('accessToken');
  window.__PRELOADED_STATE__ = { accessToken };
}

const store = configureStore(window.__PRELOADED_STATE__);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./client/Root', () => render(Root));
}

registerServiceWorker();
