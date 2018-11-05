import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import "./Sidebar.css"

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/upload">
        Upload Expenses
      </a>

      <a className="menu-item" href="/browse">
        Browse Expenses
      </a>

      <a className="menu-item" href="/login">
        Login
      </a>

      <a className="menu-item" href="/sign-up">
        Register
      </a>

      
    </Menu>
  );
};