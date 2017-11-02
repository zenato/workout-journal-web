import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { PAGE_TITLE } from 'config'

const Home = ({ accessToken, loggedInfo }) => {
  return (
    <div className="home">
      <Helmet>
        <title>{PAGE_TITLE}</title>
      </Helmet>

      {accessToken && loggedInfo && <article>Welcome {loggedInfo.username}!</article>}
      {!accessToken && <article>Required sign in.</article>}
    </div>
  )
}

export default connect(state => ({
  accessToken: state.users.accessToken,
  loggedInfo: state.users.loggedInfo,
}))(Home)
