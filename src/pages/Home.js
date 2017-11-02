import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { PAGE_TITLE } from 'config'

const Home = ({ initialized, loggedInfo }) => {
  return (
    <div className="home">
      <Helmet>
        <title>{PAGE_TITLE}</title>
      </Helmet>

      {initialized && (
        <div>
          {loggedInfo && <article>Welcome {loggedInfo.username}!</article>}
          {!loggedInfo && <article>Required sign in.</article>}
        </div>
      )}
    </div>
  )
}

export default connect(state => ({
  initialized: state.users.initialized,
  loggedInfo: state.users.loggedInfo,
}))(Home)
