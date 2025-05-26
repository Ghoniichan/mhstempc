import { NavLink } from 'react-router-dom';
import navlogo from '../../../src/assets/Images/mhstempc_logo.png';
import './Sidebar.css';

const Sidebar = () => {
  return (
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

        <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <span className="Navicon"><i className="bi bi-gear"></i></span>
          <span className="description">Settings</span>
        </NavLink>

        <NavLink to="/logout" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <span className="Navicon"><i className="bi bi-box-arrow-right"></i></span>
          <span className="description">Log Out</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
