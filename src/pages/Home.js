import React from 'react';
import { Helmet } from 'react-helmet';
import { SITE_NAME } from '../constants';

const Home = () => {
  return (
    <div className="home">
      <Helmet>
        <title>{SITE_NAME}</title>
      </Helmet>

      Welcome!
    </div>
  );
};

export default Home;
