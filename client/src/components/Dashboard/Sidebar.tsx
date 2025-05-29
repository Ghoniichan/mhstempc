import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';
import navlogo from '../../../src/assets/Images/mhstempc_logo.png';
import SettingSection from './SettingSection';
import './Sidebar.css';

const Sidebar = () => {
  const [showSettings, setShowSettings] = useState(false);
  // const location = useLocation();

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent default navigation
    setShowSettings((prev) => !prev); // toggle panel
  };

  const handleClosePanel = () => {
    setShowSettings(false);
  };

  return (
    <>
      <div className="sidebar">
        <div className="mb-3 d-flex justify-content-center flex-column align-items-center">
          <img src={navlogo} className="navlogo img-fluid" alt="logo" />
          <div className="label text-center mt-2 fs-5">MHSTEMPC</div>
        </div>

        <nav className="nav flex-column">
          <NavLink to="/account" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="Navicon"><i className="bi bi-person"></i></span>
            <span className="description">Account</span>
          </NavLink>

          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="Navicon"><i className="bi bi-grid"></i></span>
            <span className="description">Dashboard</span>
          </NavLink>

          <NavLink to="/client" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="Navicon"><i className="bi bi-people"></i></span>
            <span className="description">Client</span>
          </NavLink>

          <NavLink to="/notifications" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="Navicon"><i className="bi bi-bell"></i></span>
            <span className="description">Notification</span>
          </NavLink>

          <a href="#settings" onClick={handleSettingsClick} className={`nav-link ${showSettings ? 'active' : ''}`}>
            <span className="Navicon"><i className="bi bi-gear"></i></span>
            <span className="description">Settings</span>
          </a>

          <NavLink to="/logout" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="Navicon"><i className="bi bi-box-arrow-right"></i></span>
            <span className="description">Log Out</span>
          </NavLink>
          
        </nav>
      </div>

      {showSettings && (
        <div className="settings-panel">
          <div className="settings-header d-flex justify-content-between align-items-center p-2 border-bottom">
            <h5 className="ms-3 mt-3 h5-setting">Settings</h5>
            <button className="btn-close" onClick={handleClosePanel}></button>
          </div>
          <div className="p-3">
            <SettingSection />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
