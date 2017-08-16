import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './client/Root';
import registerServiceWorker from './registerServiceWorker';
import 'styles/index.scss';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./client/Root', () => render(Root));
}

registerServiceWorker();
