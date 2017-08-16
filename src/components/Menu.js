import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.scss';

const cx = classNames.bind(styles);

const Menu = () => {
  return (
    <div className={cx('menu')}>
      <ul>
        <li><NavLink exact to="/" activeClassName={cx('active')}>Home</NavLink></li>
        <li><NavLink to="/events" activeClassName={cx('active')}>Events</NavLink></li>
        <li><NavLink to="/posts" activeClassName={cx('active')}>Posts</NavLink></li>
      </ul>
    </div>
  );
};

export default Menu;
