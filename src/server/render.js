import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from 'state/configureStore'
import { Helmet } from 'react-helmet'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { getComponents, preload } from 'lib/router'
import routes from 'routes'
import App from 'shared/App'

const render = async ({ req, accessToken }) => {
  const initialState = { users: { accessToken }, renderedServer: true }
  const store = configureStore(initialState)
  const sheet = new ServerStyleSheet()
  const context = {}

  const components = await getComponents(routes, req.path)
  await preload(components, store.getState(), store.dispatch, req.query)

  const { html } = renderToString(
    <StaticRouter location={req.url} context={context}>
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
