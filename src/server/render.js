import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { renderToString } from 'react-router-server';
import { Helmet } from 'react-helmet';
import configureStore from 'redux/configureStore';
import App from 'shared/App';

const render = async (location) => {
  const store = configureStore();

  const { html } = await renderToString(
    <StaticRouter location={location}>
      <Provider store={store}>
        <App/>
      </Provider>
    </StaticRouter>
  );

  const helmet = Helmet.renderStatic();

  return {
    html,
    state: store.getState(),
    helmet,
  };
};

export default render;
