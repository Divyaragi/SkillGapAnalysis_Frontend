import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import LoginPage from '../login/Loginpage';
import Navbar from '../Sidebar/Sidebar';
import HomePage from '../HomePage/HomePage';
import Topbar from '../Topbar/Topbar';
import './Dashboard.css';
import AdminDashboard from '../../components/Dashboard/Admin-Dashboard/admin-dashboard'
import AuthGuard from '../../common/Auth' 
import CheckList from '../../components/Dashboard/Checklist-Dashboard/Check-List'
import UserDashboard from '../../components/Dashboard/User-Dashboard/User-Dashboard'
import ProjectManagerDashboard from '../../components/Dashboard/Project-Managaer-Dashboard/Project-Manager-Dashbaord'
function DashboardContent() {
  const noNavBarRoutes = ['/login'];
  const location = useLocation();
  const isNavVisible = !noNavBarRoutes.includes(location.pathname);
  const [navVisible, showNavbar] = useState(false);
 
  return (
    <div className="d-flex main">
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <div className="col-auto d-flex">
        {isNavVisible && <Navbar visible={navVisible} show={showNavbar} />}
      </div>
      <div className='w-100' >
        <div className='top-bar-card'>
          {isNavVisible && <Topbar visible={navVisible} show={showNavbar} />}
        </div>
        <div className=' w-100 dashboard-content-container'>
          <Routes>
            <Route path='/dashboard' element={<AuthGuard><HomePage /></AuthGuard>} />
            <Route path='/admindashboard' element={<AuthGuard><AdminDashboard /></AuthGuard>} />
            <Route path='/checklist' element={<AuthGuard><CheckList /></AuthGuard>} />
            <Route path='/userdashboard' element={<AuthGuard><UserDashboard /></AuthGuard>} />
            <Route path='/projectmanagerdashboard' element={<AuthGuard><ProjectManagerDashboard /></AuthGuard>} />




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