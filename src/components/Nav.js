import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavWrapper = styled.nav`
  display: flex;
  background-color: #323232;
  color: #f2f2f2;
  padding: 10px;
  margin: 0;
  font-size: 1.2rem;

  a {
    color: #f2f2f2;
    &:hover,
    &:active,
    &:visited {
      color: #f2f2f2;
    }
  }

  li:not(:last-child) {
    float: left;
    margin-right: 10px;
  }

  .active {
    color: red !important;
    font-weight: bold;
  }
`

const Menu = styled.div`
  flex: 1;
`

const UserInfo = styled.aside`
  display: flex;
  width: 200px;
  align-items: flex-end;
  justify-content: flex-end;

  a {
    font-size: 0.8em;
  }
`

const Nav = ({ loggedInfo, onLogout }) => {
  return (
    <NavWrapper>
      <Menu>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" activeClassName="active">
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts" activeClassName="active">
              Posts
            </NavLink>
          </li>
        </ul>
      </Menu>
      {loggedInfo && (
        <UserInfo>
          <a href="" onClick={onLogout}>
            Logout
          </a>
        </UserInfo>
      )}
    </NavWrapper>
  )
}

Nav.propTypes = {
  loggedInfo: PropTypes.shape({
    username: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
}

export default Nav
