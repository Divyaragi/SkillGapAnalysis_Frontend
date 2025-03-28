import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '../Sidebar/Sidebar';
import HomePage from '../HomePage/HomePage';
import Topbar from '../Topbar/Topbar';
import './dashboard.css';
import DashboardTwo from '../DashboardTwo';
import RatingsManager from '../RatingsManger';
import TrainingsManager from '../TrainigsManager/TrainingsManger';
function Dashboard() {
  const noNavBarRoutes = ['/login'];
  const location = useLocation(); // ✅ Now it works correctly!
  const isNavVisible = !noNavBarRoutes.includes(location.pathname);
  const [navVisible, showNavbar] = useState(false);

  return (
    <div className="d-flex main">
      {/* Sidebar */}
      {isNavVisible && (
        <div className="col-auto d-flex">
          <Navbar visible={navVisible} show={showNavbar} />
        </div>
      )}

      {/* Main Content */}
      <div className="w-100">
        {isNavVisible && (
          <div className="top-bar-card">
            <Topbar visible={navVisible} show={showNavbar} />
          </div>
        )}

        <div className="w-100 dashboard-content-container">
          <Routes>
            <Route path="/" element={<DashboardTwo />} />
            <Route path="/skills" element={<HomePage />} />
            <Route path="/users" element={<DashboardTwo />} />
            <Route path="/ratings" element={<RatingsManager />} />
            <Route path="/Tranings" element={<TrainingsManager />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
