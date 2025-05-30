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
    <nav
      className="navbar"
      style={{ transform: `translateY(${offset}px)` }}
    >
      <ul>
        <li><NavLink to="/" end className="nav-link">HOMEPAGE</NavLink></li>
        <li><NavLink to="/qa" className="nav-link">Q&A</NavLink></li>
        <li><NavLink to="/new" className="nav-link">NEWS</NavLink></li>
        <li><NavLink to="/services" className="nav-link">SERVICES</NavLink></li>
        <li><NavLink to="/about" className="nav-link">ABOUT</NavLink></li>
        <li><NavLink to="/contact" className="nav-link">CONTACT</NavLink></li>
      </ul>
    </nav>
  );
}