import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      console.log('scrollY:', scrollY); // Debug để kiểm tra giá trị scrollY
      const newOffset = -scrollY; // Trôi lên bằng tốc độ cuộn
      setOffset(newOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="main-navbar">
      <ul>
        <li><NavLink to="/" end className="nav-link">TRANG CHỦ</NavLink></li>
        <li><NavLink to="/qa" className="nav-link">Q&A</NavLink></li>
        <li><NavLink to="/new" className="nav-link">TIN TỨC</NavLink></li>
        <li><NavLink to="/services" className="nav-link">DỊCH VỤ</NavLink>
          <ul className="submenu">
            <li><NavLink to="/services/donate" className="nav-link">Hiến máu</NavLink></li>
            <li><NavLink to="/services/receive" className="nav-link">Nhận máu</NavLink></li>
          </ul>
        </li>
        <li><NavLink to="/about" className="nav-link">VỀ CHÚNG TÔI</NavLink></li>
      </ul>
    </nav>
  );
}