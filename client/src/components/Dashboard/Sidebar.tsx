import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import navlogo from '../../../src/assets/Images/mhstempc_logo.png';
import SettingSection from './SettingSection';
import NotificationSection from './NotificationSection';
import './Sidebar.css';

const Sidebar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();
  
  const logout = () => {
    localStorage.removeItem('token');
  }

  useEffect(() => {
    const getUserRole = () => {
      try {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) {
          setUserRole('user'); // default fallback role
          return;
        }

        const payload = jwtToken.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        const isAdmin = decoded?.user?.isAdmin;

        setUserRole(isAdmin ? 'admin' : 'user');
      } catch (error) {
        console.error("Invalid token or decoding failed", error);
        setUserRole('user'); // fallback in case of error
      }
    };

    getUserRole();
  }, [location.pathname]);

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSettings(prev => !prev);
    setShowNotifications(false);
  };

  const handleNotificationsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowNotifications(prev => !prev);
    setShowSettings(false);
  };

  const handleClosePanel = () => {
    setShowSettings(false);
    setShowNotifications(false);
  };

  const renderAdminNavigation = () => (
    <>
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <span className="Navicon"><i className="bi bi-grid"></i></span>
        <span className="description">Dashboard</span>
      </NavLink>
      <NavLink to="/client" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <span className="Navicon"><i className="bi bi-people"></i></span>
        <span className="description">Client</span>
      </NavLink>
      <a href="#notifications" onClick={handleNotificationsClick} className={`nav-link ${showNotifications ? 'active' : ''}`}>
        <span className="Navicon"><i className="bi bi-bell"></i></span>
        <span className="description">Notification</span>
      </a>
      <a href="#settings" onClick={handleSettingsClick} className={`nav-link ${showSettings ? 'active' : ''}`}>
        <span className="Navicon"><i className="bi bi-gear"></i></span>
        <span className="description">Settings</span>
      </a>
      <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <span className="Navicon"><i className="bi bi-box-arrow-right"></i></span>
        <span className="description">Log Out</span>
      </NavLink>
    </>
  );

  const renderUserNavigation = () => (
    <>
      <NavLink to="/userProfile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <span className="Navicon"><i className="bi bi-person"></i></span>
        <span className="description">Account</span>
      </NavLink>
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <span className="Navicon"><i className="bi bi-grid"></i></span>
        <span className="description">Dashboard</span>
      </NavLink>
      <NavLink to="/userAppointment" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <span className="Navicon"><i className="bi bi-calendar-event"></i></span>
        <span className="description">Appointment</span>
      </NavLink>
      <a href="#notifications" onClick={handleNotificationsClick} className={`nav-link ${showNotifications ? 'active' : ''}`}>
        <span className="Navicon"><i className="bi bi-bell"></i></span>
        <span className="description">Notification</span>
      </a>
      <a href="#settings" onClick={handleSettingsClick} className={`nav-link ${showSettings ? 'active' : ''}`}>
        <span className="Navicon"><i className="bi bi-gear"></i></span>
        <span className="description">Settings</span>
      </a>
      <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <span className="Navicon"><i className="bi bi-box-arrow-right"></i></span>
        <span className="description" onClick={logout}>Log Out</span>
      </NavLink>
    </>
  );

  // Don't show anything until userRole is set
  if (!userRole) return null;

  return (
    <>
      <div className="sidebar">
        <div className="mb-3 d-flex justify-content-center flex-column align-items-center">
          <img src={navlogo} className="navlogo img-fluid" alt="logo" />
          <div className="label text-center mt-2 fs-5">MHSTEMPC</div>
          <div className="role-indicator text-center mt-1 small text-muted">
            ({userRole === 'admin' ? 'Administrator' : 'User'})
          </div>
        </div>

        <nav className="nav flex-column">
          {userRole === 'admin' ? renderAdminNavigation() : renderUserNavigation()}
        </nav>
      </div>

      {/* Settings Panel */}
      {showSettings && (
      <div className="sidebar-settings-panel">
        <div className="settings-header d-flex justify-content-between align-items-center p-2 border-bottom">
          <h5 className="ms-3 mt-3 h5-setting">Settings</h5>
          <button className="btn-close" onClick={handleClosePanel}></button>
        </div>
        <div className="p-3">
          <SettingSection role={userRole === 'admin' ? 'Admin' : 'User'} />
        </div>
      </div>
    )}


      {/* Notification Panel */}
      {showNotifications && (
        <div className="sidebar-settings-panel">
          <div className="settings-header d-flex justify-content-between align-items-center p-2 border-bottom">
            <h5 className="ms-3 mt-3 h5-setting">Notifications</h5>
            <button className="btn-close" onClick={handleClosePanel}></button>
          </div>
          <div className="p-3">
            <NotificationSection />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
