import logoNav from '../../../src/assets/images/mhstempc_logo.png'
import './Navbar.css'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top w-100">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logoNav} alt="logo" className="img-fluid" style={{maxHeight: '60px', paddingLeft: '15px'}} />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Help</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Portfolio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Forms</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About Us</a>
            </li>
          </ul>
          <div className="login-btn-container">
            <a href="#" className="login-link">Login</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;