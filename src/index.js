import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import Cookies from 'js-cookie'
//import registerServiceWorker from './registerServiceWorker'
import configureStore from './state/configureStore'
import { fetch, fetchComplete } from './state/actions/preloader'
import { successSignIn } from './state/actions/users'
import { getComponents } from './lib/router'
import { fetchLoggedInfo } from './lib/api'
import routes from 'routes'
import Preloader from './shared/Preloader'
import App from './shared/App'
import Error from './pages/Error'
import './index.scss'

const history = createHistory()
const store = configureStore(window.__PRELOADED_STATE__ || {}, history)
const { renderedServer } = store.getState()

const render = Component =>
  ReactDOM.hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Preloader
          renderedServer={renderedServer}
          onLoad={() => {
            store.dispatch(fetch())
            store.dispatch(showLoading())
          }}
          onComplete={() => {
            store.dispatch(hideLoading())
            store.dispatch(fetchComplete())
          }}
          loadParams={{ store }}
          renderError={Error}
        >
          <AppContainer>
            <Component />
          </AppContainer>
        </Preloader>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  )
;(async () => {
  // Restore authentication
  if (!renderedServer) {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
      try {
        const loggedInfo = await fetchLoggedInfo(accessToken)
        store.dispatch(successSignIn({ accessToken, loggedInfo }))
      } catch (e) {}
    }
  }

  // Components loading for SSR
  await getComponents(routes, window.location.pathname)

  render(App)
})()

//registerServiceWorker()

if (module.hot) {
  module.hot.accept('./shared/App', () => render(App))
}
