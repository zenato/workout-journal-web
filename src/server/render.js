import React from 'react'
import { renderToString } from 'react-dom/server'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from 'state/configureStore'
import { Helmet } from 'react-helmet'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import createHistory from 'history/createMemoryHistory'
import { getComponents, preload } from 'lib/router'
import routes from 'routes'
import App from 'shared/App'

const isPerformRedirect = (store, pathname) => {
}

const render = async ({ req, accessToken }) => {

  const initialState = { users: { accessToken }, renderedServer: true }
  const history = createHistory({ initialEntries: [req.path] })
  const store = configureStore(initialState, history)
  const sheet = new ServerStyleSheet()

  const components = await getComponents(routes, req.path)
  await preload(components, store.getState(), store.dispatch, req.query)

  const html = renderToString(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <StyleSheetManager sheet={sheet.instance}>
          <App />
        </StyleSheetManager>
      </ConnectedRouter>
    </Provider>,
  )

  // Redirect
  const location = store.getState().router.location
  if (location && location.pathname !== req.path) {
    return { url: location.pathname }
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
