import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { PAGE_TITLE } from 'config'

const Home = ({ loggedInfo }) => {
  return (
    <div className="home">
      <Helmet>
        <title>{PAGE_TITLE}</title>
      </Helmet>

      <article>Welcome {loggedInfo && loggedInfo.username}!</article>
    </div>
  )
}

export default connect(state => ({
  loggedInfo: state.users.loggedInfo,
}))(Home)
