import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import Cookies from 'js-cookie'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './state/configureStore'
import { successSignIn } from './state/actions/users'
import { fetchLoggedInfo } from './lib/api'
import Preloader from './shared/Preloader'
import App from './shared/App'
import './index.scss'

const history = createHistory()
const store = configureStore(window.__PRELOADED_STATE__ || {}, history)

const render = Component => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Preloader>
          <AppContainer>
            <Component />
          </AppContainer>
        </Preloader>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  )
}

;(async () => {
  // Restore authentication
  if (!store.getState().renderedServer) {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
      try {
        const loggedInfo = await fetchLoggedInfo(accessToken)
        store.dispatch(successSignIn({ accessToken, loggedInfo }))
      } catch (e) {
      }
    }
  }

  render(App)
  registerServiceWorker()

  if (module.hot) {
    module.hot.accept('./shared/App', () => render(App))
  }
})()
