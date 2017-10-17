import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

const Home = ({ user }) => {
  return (
    <div className="home">
      <Helmet>
        <title>{process.env.REACT_APP_SITE_NAME}</title>
      </Helmet>

      <article>Welcome {user && user.username}!</article>
    </div>
  )
}

export default connect(state => ({
  user: state.users.user,
}))(Home)
