import React from 'react';
import './style/App.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AppRoutes from './routes/AppRoutes.jsx';


function App() {
  return (
    <>
      <Navbar />
      <AppRoutes/>
      <Footer />
    </>
  );
}

export default App;
