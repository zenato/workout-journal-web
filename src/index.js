import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import registerServiceWorker from './registerServiceWorker'
import configureStore from 'state/configureStore'
import Root from './client/Root'
import './index.scss'

const store = configureStore(window.__PRELOADED_STATE__ || {})

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(Root)

if (module.hot) {
  module.hot.accept('./client/Root', () => render(Root))
}

registerServiceWorker()
