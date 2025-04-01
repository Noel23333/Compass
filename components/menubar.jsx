import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function MenuBar() {
  const location = useLocation();

  return (
    <aside className="menu p-4">
      <p className="menu-label">main menu</p>
      <ul className="menu-list">
        <li>
          <Link 
            to="/main" 
            className={location.pathname === '/main' ? 'is-active' : ''}
          >
            <span className="icon-text">
              <span className="icon">
                <i className="fas fa-code"></i>
              </span>
              <span>code generation</span>
            </span>
          </Link>
        </li>
        <li>
          <Link 
            to="/settings" 
            className={location.pathname === '/settings' ? 'is-active' : ''}
          >
            <span className="icon-text">
              <span className="icon">
                <i className="fas fa-cog"></i>
              </span>
              <span>project settings</span>
            </span>
          </Link>
        </li>
        <li>
          <Link 
            to="/history" 
            className={location.pathname === '/history' ? 'is-active' : ''}
          >
            <span className="icon-text">
              <span className="icon">
                <i className="fas fa-history"></i>
              </span>
              <span>history</span>
            </span>
          </Link>
        </li>
      </ul>

      <p className="menu-label mt-6">
        help
      </p>
      <ul className="menu-list">
        <li>
          <Link 
            to="/documentation" 
            className={location.pathname === '/documentation' ? 'is-active' : ''}
          >
            <span className="icon-text">
              <span className="icon">
                <i className="fas fa-book"></i>
              </span>
              <span>help document</span>
            </span>
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            className={location.pathname === '/about' ? 'is-active' : ''}
          >
            <span className="icon-text">
              <span className="icon">
                <i className="fas fa-info-circle"></i>
              </span>
              <span>about</span>
            </span>
          </Link>
        </li>
      </ul>

      <div className="mt-auto">
        <p className="menu-label mt-6">
            user
        </p>
        <ul className="menu-list">
          <li>
            <Link to="/" className="has-text-danger">
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
                <span>logout</span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default MenuBar;
