import React from 'react';
import { Route, Routes } from 'react-router';    
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import DashBoard from '../pages/DashBoard';
import DashBoardHome from '../pages/DashBoardHome';
import DashBoardSettings from '../pages/DashBoardSettings';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Services from '../pages/Services';
import News from '../pages/News';
import QA from '../pages/QA';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='services' element={<Services/>}/>
      <Route path='new' element={<News/>}/>
      <Route path='qa' element={<QA/>}/>
      
      <Route path='dashboard' element={<DashBoard />}>
        <Route index element={<DashBoardHome />} />
        <Route path='settings' element={<DashBoardSettings />} />
      </Route>
      <Route path=''/>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
