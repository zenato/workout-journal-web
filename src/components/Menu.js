import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  color: 'red',
  fontWeight: 'bold',
};

const Menu = () => {
  return (
    <div className="menu">
      <ul>
        <li><NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink></li>
        <li><NavLink to="/events" activeStyle={activeStyle}>Events</NavLink></li>
        <li><NavLink to="/posts" activeStyle={activeStyle}>Posts</NavLink></li>
      </ul>
    </div>
  );
};

export default Menu;
