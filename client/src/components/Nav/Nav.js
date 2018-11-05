// import React from "react";
import React, { Component } from "react";
import './Nav.css'


class Nav extends Component {

  logout = () => {
  localStorage.clear()
  }

  render() {
    const previewStyle = {
        display: 'inline',
        width: 100,
        height: 100,
      };
      return (
  // <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  
    <a className="navbar-brand" href="/">
      OCR Expense Tracker
    </a>
    <a className="nav-bar-links" href="/">Home</a>
    <a className="nav-bar-links" href="/Upload">Upload</a>
    <a className="nav-bar-links" href="/Browse">Browse</a>
    <a className="nav-bar-links" href="/LogIn">Login</a>
    <a className="nav-bar-links" onClick={this.logout}>Logout</a>
  
    <a className="nav-bar-sign-up" href="/Sign-Up">Sign Up</a>
  
 
  </nav>
    );
  }
}

export default Nav;
