import _ from 'lodash'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

const unauthorization = error => {
  const statusCode = _.get(error, 'response.status') || 500
  return statusCode > 400 && statusCode < 500
}

const goSignIn = ({ push }) => push('/signIn')

class Error extends Component {
  state = {
    initialized: true,
  }

  componentDidMount() {
    const { error, history } = this.props
    if (unauthorization(error)) {
      goSignIn(history)
    } else {
      console.error(error)
      this.setState({ initialized: true })
    }
  }

  componentWillReceiveProps({ error }) {
    const { history, error: prev } = this.props
    if (prev !== error && unauthorization(error)) {
      goSignIn(history)
    }
  }

  render() {
    const { history } = this.props
    const { initialized } = this.state
    return !initialized ? null : (
      <div>
        <div>Oops, An expected error seems to have occurred.</div>
        <div>
          <button onClick={() => history.goBack()}>Back</button>
          <button onClick={() => history.push('/')}>Home</button>
        </div>
      </div>
    )
  }
}

export default withRouter(Error)
