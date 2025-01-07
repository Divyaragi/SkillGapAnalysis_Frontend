import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import LoginPage from '../login/Loginpage';
import Navbar from '../Sidebar/Sidebar';
import HomePage from '../HomePage/HomePage';
import Topbar from '../Topbar/Topbar';
import './dashboard.css';
import AuthGuard from '../../common/Auth' ;
import DashboardTwo from '../DashboardTwo';
import DashboardThree from '../DashboardThree';
function DashboardContent() {
  const noNavBarRoutes = ['/login'];
  const location = useLocation();
  const isNavVisible = !noNavBarRoutes.includes(location.pathname);
  const [navVisible, showNavbar] = useState(false);
 
  return (
    <div className="d-flex main">
      <div className="col-auto d-flex">
    <Navbar visible={navVisible} show={showNavbar} />
      </div>
      <div className='w-100' >
        <div className='top-bar-card'>
         <Topbar visible={navVisible} show={showNavbar} />
        </div>
        <div className=' w-100 dashboard-content-container'>
          <Routes>
            <Route path='/dashboard' element={<HomePage />} />
            <Route path='/dashboard-two' element={<DashboardTwo />} />
            <Route path='/dashboard-three' element={<DashboardThree />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
 
export default function Dashboard() {
  return (
    <BrowserRouter>
      <DashboardContent />
    </BrowserRouter>
  );
}