import _ from 'lodash'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Error extends Component {
  componentWillReceiveProps({ error }) {
    const { history, error: prevError } = this.props
    if (prevError !== error) {
      const statusCode = _.get(error, 'response.status') || 500
      if (statusCode > 400 && statusCode < 500) {
        history.push('/signIn')
      }
    }
  }

  render() {
    const { history } = this.props
    return (
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
