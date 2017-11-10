import _ from 'lodash'
import React from 'react'
import { withRouter } from 'react-router-dom'

const Error = ({ history, error }) => {
  const statusCode = _.get(error, 'response.status') || 500
  if (statusCode > 400 && statusCode < 500) {
    history.push('/signIn')
    return null
  }

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

export default withRouter(Error)
