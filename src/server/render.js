import React from 'react'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import { renderToString } from 'react-router-server'
import configureStore from 'state/configureStore'
import { Helmet } from 'react-helmet'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import App from 'shared/App'

const render = async ({ location, accessToken }) => {
  const initialState = { users: { accessToken } }
  const store = configureStore(initialState)
  const sheet = new ServerStyleSheet()
  const context = {}

  const { html } = await renderToString(
    <StaticRouter location={location} context={context}>
      <Provider store={store}>
        <StyleSheetManager sheet={sheet.instance}>
          <App />
        </StyleSheetManager>
      </Provider>
    </StaticRouter>,
  )

  // Redirect
  if (context.url) {
    return {
      url: context.url,
    }
  }

  const helmet = Helmet.renderStatic()
  return {
    html,
    state: store.getState(),
    helmet,
    style: sheet.getStyleTags(),
  }
}

export default render
