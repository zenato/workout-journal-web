import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Nav.scss';

const cx = classNames.bind(styles);

const Nav = ({ user, onLogout }) => {
  return (
    <nav className={cx('nav')}>
      <div className={cx('main')}>
        <ul>
          <li><NavLink exact to="/" activeClassName={cx('active')}>Home</NavLink></li>
          <li><NavLink to="/events" activeClassName={cx('active')}>Events</NavLink></li>
          <li><NavLink to="/posts" activeClassName={cx('active')}>Posts</NavLink></li>
        </ul>
      </div>
      {user && (
        <aside className={cx('tool')}>
            <a href="" onClick={onLogout}>Logout</a>
        </aside>
      )}
    </nav>
  );
};

Nav.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default Nav;
