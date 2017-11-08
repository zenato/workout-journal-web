import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import Preloader from './shared/Preloader'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './state/configureStore'
import App from './shared/App'
import './index.scss'

const store = configureStore(window.__PRELOADED_STATE__ || {})

const render = Component => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <Provider store={store}>
        <Preloader>
          <AppContainer>
            <Component />
          </AppContainer>
        </Preloader>
      </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
  )
}

render(App)
registerServiceWorker()

if (module.hot) {
  module.hot.accept('./shared/App', () => render(App))
}
