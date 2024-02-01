import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css';

function Nav() {
  return (
    <nav className="navbar navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Teatro</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">INICIO</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/historia">HISTORIA</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/eventos">EVENTOS</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/teatro">TEATRO</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
