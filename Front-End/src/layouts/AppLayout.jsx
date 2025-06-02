import React from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import './AppLayout.css';

export default function AppLayout() {
  return (
    <header className="header">
      <Header />
      <Navbar />
    </header>
  );
}
