import React from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import styles from './Menu.scss';

const cx = classNames.bind(styles);

const logout = (e) => {
  e.preventDefault();
  Cookies.remove('accessToken');
  window.location.href = '/';
};

const Menu = ({ user }) => {
  return (
    <div className={cx('menu')}>
      <div className={cx('main')}>
        <ul>
          <li><NavLink exact to="/" activeClassName={cx('active')}>Home</NavLink></li>
          <li><NavLink to="/events" activeClassName={cx('active')}>Events</NavLink></li>
          <li><NavLink to="/posts" activeClassName={cx('active')}>Posts</NavLink></li>
        </ul>
      </div>
      <div className={cx('tool')}>
        {user && (
          <a href="/logout" onClick={logout}>Logout</a>
        )}
      </div>
    </div>
  );
};

export default Menu;
