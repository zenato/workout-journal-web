import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { renderToString } from 'react-router-server';
import configureStore from 'redux/configureStore';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import App from 'shared/App';

const render = async ({ location, accessToken }) => {
  const store = configureStore({ accessToken });
  const sheet = new ServerStyleSheet();

  const { html } = await renderToString(
    <StaticRouter location={location}>
      <Provider store={store}>
        <StyleSheetManager sheet={sheet.instance}>
          <App />
        </StyleSheetManager>
      </Provider>
    </StaticRouter>,
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
