import React from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter } from 'react-router'
import queryString from 'query-string'
import { getComponents, preload } from 'lib/router'
import routes from 'routes'

const query = () => queryString.parse(window.location.search)

class Preloader extends React.Component {
  state = {
    initialized: false,
    location: null,
  }

  async componentDidMount() {
    const { location, loadParams, renderedServer, onLoad, onError, onComplete } = this.props
    onLoad()
    try {
      const components = await getComponents(routes, location.pathname)
      if (!renderedServer) {
        await preload({
          ...loadParams,
          components,
          query: query(),
        })
      }
      this.components = components
    } catch (error) {
      onError({ location, error })
    }
    this.setState({ initialized: true, location })
    onComplete()
  }

  async componentWillReceiveProps({ location }) {
    const { location: prevLocation, loadParams, onLoad, onError, onComplete } = this.props
    if (prevLocation !== location) {
      onLoad()
      try {
        const components = await getComponents(routes, location.pathname)
        const changedComponents = components.filter(({ match }) => {
          return !this.components.filter(
            ({ match: prev }) => prev.path === match.path && prev.exact === match.exact,
          ).length
        })
        await preload({
          ...loadParams,
          components: changedComponents,
          query: query(),
        })
        this.components = components
        this.setState({ location })
      } catch (error) {
        onError({ location, error })
      }
      onComplete()
    }
  }

  render() {
    const { children } = this.props
    const { initialized, location } = this.state
    return initialized && <Route key="route" render={() => children} location={location} />
  }
}

Preloader.propTypes = {
  state: PropTypes.any,
  dispatch: PropTypes.func,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onComplete: PropTypes.func,
  renderedServer: PropTypes.bool.isRequired,
  params: PropTypes.object,
}

Preloader.defaultProps = {
  onLoad: () => {},
  onError: () => {},
  onComplete: () => {},
  renderedServer: false,
  loadParams: {},
}

export default withRouter(Preloader)
