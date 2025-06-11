import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from "../../../contexts/ThemeContext";
import './Navbar.css';

export default function Navbar() {
  const [offset, setOffset] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const [submenuOpen, setSubmenuOpen] = useState({
    news: false,
    services: false,
  });

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

  const toggleSubmenu = (menuKey) => {
    setSubmenuOpen((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <>
      <nav className="main-navbar">
        <ul>
          <li><NavLink to="/" end className="nav-link">TRANG CHỦ</NavLink></li>
          {/* TIN TỨC */}
          <li className={`has-submenu ${submenuOpen.news ? 'open' : ''}`}>
            <div
              onClick={() => toggleSubmenu('news')}
              className="nav-link submenu-toggle"
              aria-haspopup="true"
              aria-expanded={submenuOpen.news ? "true" : "false"}
            >
              TIN TỨC <span className={`arrow ${submenuOpen.news ? 'rotated' : ''}`}>&#x25BC;</span>
            </div>
            <ul className='submenu'>
              <li><NavLink to="/new" className="nav-link">📌 Tin nổi bật</NavLink></li>
              <li><NavLink to="/new/blogs" className="nav-link">✍️ Câu chuyện</NavLink></li>
            </ul>
          </li>

          {/* DỊCH VỤ */}
          <li className={`has-submenu ${submenuOpen.services ? 'open' : ''}`}>
            <div
              onClick={() => toggleSubmenu('services')}
              className="nav-link submenu-toggle"
              aria-haspopup="true"
              aria-expanded={submenuOpen.services ? "true" : "false"}
            >
              DỊCH VỤ <span className={`arrow ${submenuOpen.services ? 'rotated' : ''}`}>&#x25BC;</span>
            </div>
            <ul className="submenu">
              <li><NavLink to="/services" className="nav-link">Các Dịch Vụ</NavLink></li>
              <li><NavLink to="/services/receive" className="nav-link">Nhận máu</NavLink></li>
              <li><NavLink to="/services/donation-request" className="nav-link">Yêu cầu hiến máu</NavLink></li>
            </ul>
          </li>

          <li><NavLink to="/about" className="nav-link">VỀ CHÚNG TÔI</NavLink></li>
        </ul>
      </nav>
    </>
  );
}
