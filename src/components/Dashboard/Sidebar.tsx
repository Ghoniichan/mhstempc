import dashboard from '../../../src/assets/Images/dashboard.png'
import client from '../../../src/assets/Images/client.png'
import notif from '../../../src/assets/Images/notification.png'
import settings from '../../../src/assets/Images/settings.png'
import logo from '../../../src/assets/Images/logo.png'


const Sidebar = () => {
  return (
    <div className="col-md-5 col-lg-4 col-sm-4 bg-primary text-white vh-100 p-3">
    <div className='mb-3 d-flex justify-content-center'>
        <img src={logo} className="img-fluid"  alt="logo"/>
    </div>
    <ul className="nav flex-column ">
      <li className="nav-item">
        <img src={dashboard} className="img-fluid"  alt="logo"/>
        <a href="#" className="nav-link text-white">Dashboard</a>
      </li>
      <li className="nav-item">
        <img src={client} className="img-fluid"  alt="logo"/>
        <a href="#" className="nav-link text-white">Client</a>
      </li>
      <li className="nav-item">
        <img src={notif} className="img-fluid"  alt="logo"/>
        <a href="#" className="nav-link text-white">Notifications</a>
      </li>
      <li className="nav-item">
        <img src={settings} className="img-fluid"  alt="logo"/>
        <a href="#" className="nav-link text-white">Settings</a>
      </li>
    </ul>
  </div>
  )
}

export default Sidebar