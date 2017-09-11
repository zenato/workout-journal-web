import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { SITE_NAME } from '../constants';

const Home = ({ user }) => {
  return (
    <div className="home">
      <Helmet>
        <title>{SITE_NAME}</title>
      </Helmet>

      <article>
        Welcome {user && user.username}!
      </article>
    </div>
  );
};

export default connect(
  (state) => ({
    user: state.users.user,
  }),
)(Home);
