import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from "../../../contexts/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import './Navbar.css';

export default function Navbar() {
  const [offset, setOffset] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const [submenuOpen, setSubmenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const navbar = document.querySelector('.main-navbar');
      if (navbar) {
        if (scrollY > 20) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
      setOffset(-scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.className = theme + "-theme";
  }, [theme]);

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <>
      <nav className="main-navbar">
        <ul>
          <li><NavLink to="/" end className="nav-link">TRANG CHỦ</NavLink></li>
          <li><NavLink to="/qa" className="nav-link">Q&A</NavLink></li>
          <li><NavLink to="/new" className="nav-link">TIN TỨC</NavLink></li>
          <li className={`has-submenu ${submenuOpen ? 'open' : ''}`}>
            <div
              onClick={toggleSubmenu}
              className="nav-link submenu-toggle"
              aria-haspopup="true"
              aria-expanded={submenuOpen ? "true" : "false"}
            >
              DỊCH VỤ <span className={`arrow ${submenuOpen ? 'rotated' : ''}`}>&#x25BC;</span>
            </div>
            <ul className="submenu">
              <li><NavLink to="/services/blood-donation" className="nav-link">Hiến máu</NavLink></li>
              <li><NavLink to="/services/receive" className="nav-link">Nhận máu</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/about" className="nav-link">VỀ CHÚNG TÔI</NavLink></li>
        </ul>
      </nav>
      {/* Theme tối sử dụng khi đã xog toàn bộ các chức năng trên */}
      {/* <div className="theme-toggle">
        <p className="theme-text">Theme</p>
        <button onClick={toggleTheme} className="btn-toggle-theme">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div> */}
    </>
  );
}
