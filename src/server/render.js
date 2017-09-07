import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { renderToString } from 'react-router-server';
import configureStore from 'redux/configureStore';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import App from 'shared/App';
import AuthProvider from 'shared/AuthProvider';

const render = async (location, accessToken) => {
  const store = configureStore();
  const sheet = new ServerStyleSheet();

  const { html } = await renderToString(
    <StaticRouter location={location}>
      <Provider store={store}>
        <StyleSheetManager sheet={sheet.instance}>
          <AuthProvider accessToken={accessToken}>
            <App/>
          </AuthProvider>
        </StyleSheetManager>
      </Provider>
    </StaticRouter>
  );

  const helmet = Helmet.renderStatic();

  return {
    html,
    state: store.getState(),
    helmet,
    style: sheet.getStyleTags(),
  };
};

export default render;
