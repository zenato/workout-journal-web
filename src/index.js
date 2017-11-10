import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import LoadingBar, { showLoading, hideLoading } from 'react-redux-loading-bar'
import Cookies from 'js-cookie'
//import registerServiceWorker from './registerServiceWorker'
import configureStore from './state/configureStore'
import { successSignIn } from './state/actions/users'
import { fetchLoggedInfo } from './lib/api'
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
        <div>
          <LoadingBar />
          <Preloader
            renderedServer={renderedServer}
            onLoad={() => store.dispatch(showLoading())}
            onComplete={() => store.dispatch(hideLoading())}
            loadParams={{ store }}
            renderError={Error}
          >
            <AppContainer>
              <Component />
            </AppContainer>
          </Preloader>
        </div>
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

  render(App)
  //registerServiceWorker()

  if (module.hot) {
    module.hot.accept('./shared/App', () => render(App))
  }
})()
