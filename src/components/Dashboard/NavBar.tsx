import { NavLink } from 'react-router-dom';
import logo from '../../../src/assets/Images/mhstempc_logo.png';
import '../../../src/components/Dashboard/Navbar.css'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top w-100">
    <div className="container-fluid">
      <div className="navbar-brand-wrapper">
                    <img src={logo} alt='navbar logo' className='img-fluid'
                    style={{height: '50px', 
                                paddingLeft: '15px'}}/>
                <small className="Name alegreya-sans-extrabold">MHSTEMPC</small>
                </div>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/services">Services</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/help">Help</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/forms">Forms</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/about">About Us</NavLink>
          </li>
        </ul>
        <div className="login-btn-container">
          <NavLink className={({ isActive }) => `login-link ${isActive ? 'active' : ''}`} to="/login">Login</NavLink>
        </div>
      </div>
    </div>
  </nav>
  );
};

export default NavBar;
