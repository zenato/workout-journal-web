import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.scss';

const cx = classNames.bind(styles);

const activeStyle = {
  color: 'red',
  fontWeight: 'bold',
};

const Menu = () => {
  return (
    <div className={cx('menu')}>
      <ul>
        <li><NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink></li>
        <li><NavLink to="/events" activeStyle={activeStyle}>Events</NavLink></li>
        <li><NavLink to="/posts" activeStyle={activeStyle}>Posts</NavLink></li>
      </ul>
    </div>
  );
};

export default Menu;
