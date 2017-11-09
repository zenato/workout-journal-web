import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'
import LoadingBar, { showLoading, hideLoading } from 'react-redux-loading-bar'
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
    const { location, state, dispatch } = this.props
    dispatch(showLoading())
    this.components = await getComponents(routes, location.pathname)
    if (!state.renderedServer) {
      await preload(this.components, state, dispatch, query())
    }
    this.setState({ initialized: true, location })
    dispatch(hideLoading())
  }

  async componentWillReceiveProps({ location }) {
    const { location: prevLocation, state, dispatch } = this.props
    if (prevLocation !== location) {
      dispatch(showLoading())
      const components = await getComponents(routes, location.pathname)
      const changedComponents = components.filter(({ match }) => {
        return !this.components.filter(
          ({ match: prev }) => prev.path === match.path && prev.exact === match.exact,
        ).length
      })
      await preload(changedComponents, state, dispatch, query())
      this.components = components
      this.setState({ location })
      dispatch(hideLoading())
    }
  }

  render() {
    const { children } = this.props
    const { initialized, location } = this.state
    return [
      <LoadingBar />,
      initialized && <Route render={() => children} location={location} />
    ]
  }
}

export default withRouter(connect(state => ({ state }), dispatch => ({ dispatch }))(Preloader))
