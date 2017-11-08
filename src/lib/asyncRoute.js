import React from 'react'

export default function asyncComponent(getComponent) {
  class AsyncComponent extends React.Component {
    static Component = null

    static getComponent() {
      return getComponent().then(({ default: Component }) => {
        AsyncComponent.Component = Component
        return Component
      })
    }

    state = {
      Component: AsyncComponent.Component,
    }

    componentWillMount() {
      if (!this.state.Component) {
        AsyncComponent.getComponent().then(Component => {
          this.setState({ Component })
        })
      }
    }

    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }

  return AsyncComponent
}
