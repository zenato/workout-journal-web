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

      Welcome {user && user.username}!
    </div>
  );
};

export default connect(
  (state) => ({
    user: state.users.user,
  }),
)(Home);
