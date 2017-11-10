import React from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter } from 'react-router'
import queryString from 'query-string'
import { getComponents, preload } from 'lib/router'
import routes from 'routes'

const query = () => queryString.parse(window.location.search)

class Preloader extends React.Component {
  components = []

  state = {
    initialized: false,
    location: null,
    error: null,
  }

  async componentDidMount() {
    const { location, loadParams, renderedServer, onLoad, onComplete } = this.props
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
      this.setState({ error })
    }
    this.setState({ initialized: true, location })
    onComplete()
  }

  async componentWillReceiveProps({ location }) {
    const { location: prevLocation, loadParams, onLoad, onComplete } = this.props
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
        this.setState({ location, error: null })
      } catch (error) {
        this.setState({ error })
      }
      onComplete()
    }
  }

  render() {
    const { children, renderError } = this.props
    const { initialized, location, error } = this.state
    if (!initialized) {
      return null
    }
    return (
      <Route
        render={() => (error ? renderError({ error }) : React.Children.only(children))}
        location={location}
      />
    )
  }
}

Preloader.propTypes = {
  state: PropTypes.any,
  dispatch: PropTypes.func,
  onLoad: PropTypes.func,
  onComplete: PropTypes.func,
  renderedServer: PropTypes.bool.isRequired,
  renderError: PropTypes.func,
  params: PropTypes.object,
}

Preloader.defaultProps = {
  onLoad: () => {},
  onComplete: () => {},
  renderedServer: false,
  loadParams: {},
  renderError: () => null,
}

export default withRouter(Preloader)
