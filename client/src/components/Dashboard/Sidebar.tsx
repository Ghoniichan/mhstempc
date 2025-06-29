import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import navlogo from '../../../src/assets/Images/mhstempc_logo.png';
import SettingSection from './SettingSection';
import NotificationSection from './NotificationSection';
import './Sidebar.css';
import log from '../../api/log';
import { getUserIdFromJwt } from '../../utils/tokenDecoder';

const Sidebar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const location = useLocation();

  const logout = () => {
    log(getUserIdFromJwt(localStorage.getItem('token') || '') || '', 'logged out', 'User logged out');
    localStorage.clear();
  };

  useEffect(() => {
    const getUserRole = () => {
      try {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) {
          setUserRole('user');
          return;
        }

        const payload = jwtToken.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        const isAdmin = decoded?.user?.isAdmin;

        setUserRole(isAdmin ? 'admin' : 'user');
      } catch (error) {
        console.error("Invalid token or decoding failed", error);
        setUserRole('user');
      }
    };

    getUserRole();
  }, [location.pathname]);

  useEffect(() => {
    let title = "MHSTEMPC";

    if (showSettings) {
      title = "MHSTEMPC | Settings";
    } else if (showNotifications) {
      title = "MHSTEMPC | Notifications";
    } else {
      switch (location.pathname) {
        case "/dashboard":
          title = "MHSTEMPC | Dashboard";
          break;
        case "/client":
          title = "MHSTEMPC | Client";
          break;
        case "/userProfile":
          title = "MHSTEMPC | Account";
          break;
        case "/appointment":
          title = "MHSTEMPC | Appointment";
          break;
        case "/adminBugReportList":
          title = "MHSTEMPC | Bug Reports";
          break;
        case "/home":
          title = "MHSTEMPC | Home";
          break;
        default:
          title = "MHSTEMPC";
      }
    }

    document.title = title;
  }, [location.pathname, showSettings, showNotifications]);

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSettings(prev => !prev);
    setShowNotifications(false);
    setSelectedItem('settings');
  };

  const handleNotificationsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowNotifications(prev => !prev);
    setShowSettings(false);
    setSelectedItem('notifications');
  };

  const handleNavLinkClick = (item: string) => {
    setShowSettings(false);
    setShowNotifications(false);
    setSelectedItem(item);
  };

  const renderAdminNavigation = () => (
    <>
      <NavLink
        to="/dashboard"
        className={`nav-link ${selectedItem === 'dashboard' || location.pathname === '/dashboard' ? 'active' : ''}`}
        onClick={() => handleNavLinkClick('dashboard')}
      >
        <span className="Navicon"><i className="bi bi-grid"></i></span>
        <span className="description">Dashboard</span>
      </NavLink>

      <NavLink
        to="/client"
        className={`nav-link ${selectedItem === 'client' || location.pathname === '/client' ? 'active' : ''}`}
        onClick={() => handleNavLinkClick('client')}
      >
        <span className="Navicon"><i className="bi bi-people"></i></span>
        <span className="description">Client</span>
      </NavLink>

      <NavLink
        to="/appointment"
        className={`nav-link ${selectedItem === 'appointment' || location.pathname === '/appointment' ? 'active' : ''}`}
        onClick={() => handleNavLinkClick('appointment')}
      >
        <span className="Navicon"><i className="bi bi-calendar-event"></i></span>
        <span className="description">Appointment</span>
      </NavLink>

      <NavLink
        to="/adminBugReportList"
        className={`nav-link ${selectedItem === 'bug' || location.pathname === '/adminBugReportList' ? 'active' : ''}`}
        onClick={() => handleNavLinkClick('bug')}
      >
        <span className="Navicon"><i className="bi bi-bug"></i></span>
        <span className="description">Bug Reports</span>
      </NavLink>

      <a
        href="#notifications"
        onClick={handleNotificationsClick}
        className={`nav-link ${selectedItem === 'notifications' ? 'active' : ''}`}
      >
        <span className="Navicon"><i className="bi bi-bell"></i></span>
        <span className="description">Notification</span>
      </a>

      <a
        href="#settings"
        onClick={handleSettingsClick}
        className={`nav-link ${selectedItem === 'settings' ? 'active' : ''}`}
      >
        <span className="Navicon"><i className="bi bi-gear"></i></span>
        <span className="description">Settings</span>
      </a>

      <NavLink
        to="/home"
        className={`nav-link ${selectedItem === 'logout' ? 'active' : ''}`}
        onClick={() => {
          handleNavLinkClick('logout');
          logout();
        }}
      >
        <span className="Navicon"><i className="bi bi-box-arrow-right"></i></span>
        <span className="description">Log Out</span>
      </NavLink>
    </>
  );

  const renderUserNavigation = () => (
    <>
      <NavLink
        to="/userProfile"
        className={`nav-link ${selectedItem === 'account' || location.pathname === '/userProfile' ? 'active' : ''}`}
        onClick={() => handleNavLinkClick('account')}
      >
        <span className="Navicon"><i className="bi bi-person"></i></span>
        <span className="description">Account</span>
      </NavLink>

      <NavLink
        to="/dashboard"
        className={`nav-link ${selectedItem === 'dashboard' || location.pathname === '/dashboard' ? 'active' : ''}`}
        onClick={() => handleNavLinkClick('dashboard')}
      >
        <span className="Navicon"><i className="bi bi-grid"></i></span>
        <span className="description">Dashboard</span>
      </NavLink>

      <NavLink
        to="/userAppointment"
        className={`nav-link ${selectedItem === 'appointment' || location.pathname === '/userAppointment' ? 'active' : ''}`}
        onClick={() => handleNavLinkClick('appointment')}
      >
        <span className="Navicon"><i className="bi bi-calendar-event"></i></span>
        <span className="description">Appointment</span>
      </NavLink>

      <a
        href="#notifications"
        onClick={handleNotificationsClick}
        className={`nav-link ${selectedItem === 'notifications' ? 'active' : ''}`}
      >
        <span className="Navicon"><i className="bi bi-bell"></i></span>
        <span className="description">Notification</span>
      </a>

      <a
        href="#settings"
        onClick={handleSettingsClick}
        className={`nav-link ${selectedItem === 'settings' ? 'active' : ''}`}
      >
        <span className="Navicon"><i className="bi bi-gear"></i></span>
        <span className="description">Settings</span>
      </a>

      <NavLink
        to="/home"
        className={`nav-link ${selectedItem === 'logout' ? 'active' : ''}`}
        onClick={() => {
          handleNavLinkClick('logout');
          logout();
        }}
      >
        <span className="Navicon"><i className="bi bi-box-arrow-right"></i></span>
        <span className="description">Log Out</span>
      </NavLink>
    </>
  );

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

      {showSettings && (
        <div className="sidebar-settings-panel">
          <div className="settings-header d-flex justify-content-between align-items-center p-2 border-bottom">
            <h5 className="ms-3 mt-3 h5-setting">Settings</h5>
            <button className="btn-close" onClick={() => setShowSettings(false)}></button>
          </div>
          <div className="p-3">
            <SettingSection role={userRole === 'admin' ? 'Admin' : 'User'} />
          </div>
        </div>
      )}

      {showNotifications && (
        <div className="sidebar-settings-panel">
          <div className="settings-header d-flex justify-content-between align-items-center p-2 border-bottom">
            <h5 className="ms-3 mt-3 h5-setting">Notifications</h5>
            <button className="btn-close" onClick={() => setShowNotifications(false)}></button>
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
