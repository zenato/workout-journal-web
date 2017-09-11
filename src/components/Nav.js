import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import styles from './Nav.scss';

const cx = classNames.bind(styles);

const logout = (e) => {
  e.preventDefault();
  Cookies.remove('accessToken');
  window.location.href = '/';
};

const Nav = ({ user }) => {
  return (
    <nav className={cx('nav')}>
      <div className={cx('main')}>
        <ul>
          <li><NavLink exact to="/" activeClassName={cx('active')}>Home</NavLink></li>
          <li><NavLink to="/events" activeClassName={cx('active')}>Events</NavLink></li>
          <li><NavLink to="/posts" activeClassName={cx('active')}>Posts</NavLink></li>
        </ul>
      </div>
      <aside className={cx('tool')}>
        {user && (
          <a href="/logout" onClick={logout}>Logout</a>
        )}
      </aside>
    </nav>
  );
};

Nav.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
};

export default Nav;
