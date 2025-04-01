import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import fudanLogo from '../assets/fudan_1.webp';


function dropdown(isDropdownOpen) {
    if (isDropdownOpen) {
        return (
    <div className="dropdown is-active">
  <div className="dropdown-trigger">
    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Dropdown button</span>
      <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>

  <div className="dropdown-menu" id="dropdown-menu" role="menu">
    <div className="dropdown-content">
      <a href="#" className="dropdown-item"> Dropdown item </a>
      <a className="dropdown-item"> Other dropdown item </a>
      <a href="#" className="dropdown-item is-active"> Active dropdown item </a>
      <a href="#" className="dropdown-item"> Other dropdown item </a>
        <hr className="dropdown-divider" />
      <a href="#" className="dropdown-item"> With a divider </a>
    </div>
  </div>
</div>
        );
    }
    else{
        return null;}
}




function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  

  const handleLogin = () => {
    console.log('login');
    navigate('/login');
  }

const handleSignup = () => {
    console.log('signup');
    navigate('/signup');
  }
const handleLogout = () => {
    console.log('logout');
    navigate('/logout');
  }


//   const DocOpen = () => {
    
//   };

  return (
    <nav className  ="navbar has-shadow" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <Link to="/" className="navbar-item">
      <img 
        src={fudanLogo} 
        alt="fudan university" 
        style={{
          height: '32px',  // 稍微增加一点高度
          maxHeight: '32px',
          width: 'auto',
          marginRight: '0.5rem',
          padding: '2px'  // 添加一点内边距
        }}
      />
    </Link>

    <button className={`navbar-burger ${isOpen ? 'is-active' : ''}`} 
    aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" /*拓展移动端*/
    onClick={() => setIsOpen(!isOpen)}>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <Link to="/" className={`navbar-item ${location.pathname === '/' ? 'is-active' : ''}`}>
        Your Home  
      </Link>
  <div className="navbar-item"> {dropdown(isDropdownOpen)}</div>

  <div className="navbar-item has-dropdown is-hoverable">
        <button className="navbar-link" onClick={() => setIsOpen(true)}>
          Documentation
        </button>

        <div className="navbar-dropdown">
          <button className="navbar-item" onClick={() => setIsOpen(true)}>
            11
          </button>
          <button className="navbar-item is-selected" onClick={() => setIsOpen(true)}>
            22
          </button>
          <button className="navbar-item" onClick={() => setIsOpen(true)}>
            33
          </button>
          <hr className="navbar-divider" />
          <button className="navbar-item" onClick={() => setIsOpen(true)}   >
            44
          </button>
        </div>
      </div>

      <div className="navbar-item has-dropdown is-hoverable">
        <button className="navbar-link" onClick={() => setIsOpen(true)}>
          settings
        </button>

        <div className="navbar-dropdown">
          <button className="navbar-item" onClick={() => setIsOpen(true)}>
            11
          </button>
          <button className="navbar-item is-selected" onClick={() => setIsOpen(true)}>
            22
          </button>
          <button className="navbar-item" onClick={() => setIsOpen(true)}>
            33
          </button>
          <hr className="navbar-divider" />
          <button className="navbar-item" onClick={() => setIsOpen(true)}   >
            44
          </button>
        </div>
      </div>

      <div className="navbar-item has-dropdown is-hoverable">
        <button className="navbar-link" onClick={() => setIsOpen(true)}>
          More
        </button>

        <div className="navbar-dropdown">
          <button className="navbar-item" onClick={() => setIsOpen(true)}>
            55
          </button>
          <button className="navbar-item is-selected" onClick={() => setIsOpen(true)}>
            66
          </button>
          <button className="navbar-item" onClick={() => setIsOpen(true)}>
            77
          </button>
          <hr className="navbar-divider" />
          <button className="navbar-item" onClick={() => setIsOpen(true)}   >
            88
          </button>
        </div>
      </div>
    </div>
    </div>

    <div className="navbar-end">
        <div className="navbar-item">
        <div className="buttons">
            <button className="button is-primary" onClick={handleSignup}>
            <strong>Sign up</strong>
          </button>
          <button className="button is-light" onClick={handleLogin}>
            Log in
          </button>
          <button className="button is-danger" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  </nav>
  );
}

export default Navbar;