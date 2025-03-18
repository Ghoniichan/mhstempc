import './Sidebar.css'
import React from 'react'

const Sidebar = () => {
  return (
    <div className="col-md-3 col-lg-6 bg-primary text-white vh-100 p-3">
    <h4>Sidebar</h4>
    <ul className="nav flex-column">
      <li className="nav-item">
        <a href="#" className="nav-link text-white">Dashboard</a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link text-white">Settings</a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link text-white">Profile</a>
      </li>
    </ul>
  </div>
  )
}

export default Sidebar