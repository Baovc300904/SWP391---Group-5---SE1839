import React from 'react';
import Header from '../components/common/Header/Header';
import Navbar from '../components/common/Navbar/Navbar';
import './AppLayout.css';

export default function AppLayout() {
  return (
    <header className="header">
      <Header />
      <Navbar />
    </header>
  );
}
