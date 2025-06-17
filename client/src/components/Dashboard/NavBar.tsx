import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../../src/assets/Images/mhstempc_logo.png';
import '../../../src/components/Dashboard/navbarr.css';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const path = location.pathname;
    let title = 'MHSTEMPC';

    if (path === '/home') {
      title = 'MHSTEMPC | Home';
    } else if (path === '/services') {
      title = 'MHSTEMPC | Services';
    } else if (path === '/help') {
      title = 'MHSTEMPC | Help';
    } else if (path === '/forms') {
      title = 'MHSTEMPC | Forms';
    } else if (path === '/aboutUs') {
      title = 'MHSTEMPC | About Us';
    } else if (path === '/login') {
      title = 'MHSTEMPC | Login';
    }

    document.title = title;
  }, [location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg fixed-top w-100">
      <div className="container-fluid">
        <div className="navbar-brand-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <img
            src={logo}
            alt="navbar logo"
            className="img-fluid"
            style={{ height: '50px', paddingLeft: '15px', width: 'auto' }}
          />
          <small className="Name alegreya-sans-extrabold">MHSTEMPC</small>
        </div>

        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/home" onClick={closeMenu}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/services" onClick={closeMenu}>Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/help" onClick={closeMenu}>Help</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/forms" onClick={closeMenu}>Forms</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/aboutUs" onClick={closeMenu}>About Us</NavLink>
            </li>
            <li className="nav-item login-nav-item">
              <NavLink className={({ isActive }) => `nav-link login-link ${isActive ? 'active' : ''}`} to="/login" onClick={closeMenu}>Login</NavLink>
            </li>
          </ul>
          <div className="login-btn-container desktop-only">
            <NavLink className={({ isActive }) => `login-link ${isActive ? 'active' : ''}`} to="/login" onClick={closeMenu}>Login</NavLink>
          </div>
        </div>

        {isMenuOpen && (
          <div className="navbar-overlay" onClick={closeMenu}></div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
