import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '../style/Navbar.css';

export default function Navbar() {
  return (
    <>
      <header>
        <div className="header-nav">
          {/* Language selector */}
          <div className="language-selector">
            <button>VN</button>
            <span>|</span>
            <button>EN</button>
          </div>

          {/* Logo + Title Section */}
          <div className="logo-title-container">
            <div className="logo">
              <Link to="/">
                <img src="/logo.png" alt="Logo" />
              </Link>
            </div>
            <div className="title">
                <img src="/title.png" alt="title" />
            </div>
          </div>

          {/* Login and Signup Buttons */}
          <div className="login-container">
            <div className="login-button">
              <Link to="/Login">
                <i className="fa fa-user icon-user"></i> Login
              </Link>
            </div>
            <div className="signup-button">
              <Link to="/Signup">
                <i className="fa fa-user icon-user"></i> Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="navbar">
        <ul>
          <li><NavLink to="/" end className="nav-link">HOMEPAGE</NavLink></li>
          <li><NavLink to="/qa" className="nav-link">Q&A</NavLink></li>
          <li><NavLink to="/new" className="nav-link">NEWS</NavLink></li>
          <li><NavLink to="/services" className="nav-link">SERVICES</NavLink></li>
          <li><NavLink to="/about" className="nav-link">ABOUT</NavLink></li>
          <li><NavLink to="/contact" className="nav-link">CONTACT</NavLink></li>

        </ul>
        </nav>
      </header>
    </>
  );
}
