import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import LoginPage from '../login/Loginpage';
import Navbar from '../Sidebar/Sidebar';
import HomePage from '../HomePage/HomePage';
import Topbar from '../Topbar/Topbar';
import './Dashboard.css'

function DashboardContent() {
  const noNavBarRoutes = ['/login'];
  const location = useLocation();
  const isNavVisible = !noNavBarRoutes.includes(location.pathname);
  const [navVisible, showNavbar] = useState(false);

  return (
    <div className="d-flex">
      <div className="col-auto d-flex">
        {isNavVisible && <Navbar visible={navVisible} show={showNavbar} />}
      </div>
      <div className="w-100">
        <div className='top-bar-card'>
        {isNavVisible && <Topbar visible={navVisible} show={showNavbar} />}
        </div>
        <div className='dashboard-content-container'>
          <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/Dashboard' element={<HomePage />} />
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

