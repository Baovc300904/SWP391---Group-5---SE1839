import React from 'react';
import { Route, Routes } from 'react-router';    
import Home from '../components/Home/Home.jsx';
import Contact from '../components/Contacts/Contact';
import About from '../components/Abouts/About';
import DashBoard from '../Staffs/DashBoard';
import DashBoardHome from '../Staffs/DashBoardHome';
import DashBoardSettings from '../Staffs/DashBoardSettings';
import NotFound from '../pages/NotFound';
import Login from '../components/Logins/Login.jsx';
import Signup from '../components/Registers/Signup';
import Services from '../components/Service/Services';
import News from '../components/News/News';
import QA from '../components/QA/QA';

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
