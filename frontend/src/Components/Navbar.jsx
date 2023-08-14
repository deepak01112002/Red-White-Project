import React from 'react'
import { Link } from 'react-router-dom'
import "../Css/Navbar.css"
function Navbar() {
  return (
    
    <div className="navbar-container">
    <Link to="/" className="logo-link">
      <img className="logo" src="https://www.rnwmultimedia.edu.in/images/Multimedia-flag-logo.gif" alt="Logo" />
    </Link>
    <div className="nav-links">
      <Link className="nav-link" to="/">Login</Link>
      <Link className="nav-link" to="/blogs">Blogs</Link>
      <Link className="nav-link" to="/profile">Profile</Link>
    </div>
  </div>
  
  )
}

export default Navbar