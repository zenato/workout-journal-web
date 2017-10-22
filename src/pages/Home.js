import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { PAGE_TITLE } from 'config'

const Home = ({ user }) => {
  return (
    <div className="home">
      <Helmet>
        <title>{PAGE_TITLE}</title>
      </Helmet>

      <article>Welcome1 {user && user.username}!</article>
    </div>
  )
}

export default connect(state => ({
  user: state.users.user,
}))(Home)
