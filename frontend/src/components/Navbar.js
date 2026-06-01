import React from 'react';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Task Manager</h1>
        <div className="navbar-content">
          {user && (
            <>
              <span className="user-info">Welcome, {user.name}</span>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
