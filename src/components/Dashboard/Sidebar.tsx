import navlogo from '../../../src/assets/Images/mhstempc_logo.png'
import './Sidebar.css'
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
  
  // sidebar
  <div className="sidebar" 
  >
    <div className='mb-3 d-flex justify-content-center flex-column align-items-center'>
      <img src={navlogo} className="navlogo img-fluid "  alt="logo"/>
      <div className="label text-center mt-2 fs-5">MHSTEMPC</div>
    </div>
    <nav className="nav flex-column">

      {/* Account */}
      <a href='#' className='nav-link' >
        <span className="Navicon">
          <i className="bi bi-person"></i>
        </span>
        <span className="description">Account</span>
      </a>

      {/* Dashboard */}
      <a href="#" className="nav-link">
        <span className="Navicon">
          <i className="bi bi-grid"></i>
        </span>
        <span className="description">Dashboard</span>
      </a>

      {/*Client*/}
      <Link to="/client" className="nav-link">
          <span className="Navicon">
            <i className="bi bi-people"></i>
          </span>
          <span className="description">Client</span>
      </Link>

      {/*Notification*/}
      <a href="#" className="nav-link">
        <span className="Navicon">
          <i className="bi bi-bell"></i>
        </span>
        <span className="description">Notification</span>
      </a>

      {/*Settings*/}
      <a href="#" className="nav-link">
        <span className="Navicon">
          <i className="bi bi-gear"></i>
        </span>
        <span className="description">Settings</span>
      </a>

      {/*Log Out*/}
      <a href="#" className="nav-link">
        <span className="Navicon">
          <i className="bi bi-box-arrow-right"></i>
        </span>
        <span className="description">Log Out</span>
      </a>
      

    </nav>
  </div>
  )
}

export default Sidebar