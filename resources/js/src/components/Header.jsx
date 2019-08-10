import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Logo() {
  return (
    <div className="logo" title="Cinehub">
      <Link to="/" className="navbar-brand">
        <img src="img/logo_200x200.png" title="Cinehub" />
        <h1>Cinehub</h1>
      </Link>
    </div>
  );
}

const Header = props => {
  return (
    <nav className="custom-navbar navbar navbar-expand-lg">
      <div className="container align-items-center">
        <Logo />
        <button className="navbar-toggler" id="navbar-default">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div toggler="#navbar-default" className="collapse">
          <div className="navbar-collapse-header">
            <div className="row">
              <div className="collapse-brand col-6">
                <Logo />
              </div>
              <div className="collapse-close col-6">
                <button className="navbar-toggler" id="navbar-default">
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
          <ul className="ml-lg-auto navbar-nav">
            <li className="nav-item">
              <a href="#pablo" className="nav-link-icon nav-link">
                <i className="ni ni-favourite-28"></i>
                <span className="nav-link-inner--text d-lg-none">Discover</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#pablo" className="nav-link-icon nav-link">
                <i className="ni ni-notification-70"></i>
                <span className="nav-link-inner--text d-lg-none">Profile</span>
              </a>
            </li>
            <li className="dropdown nav-item">
              <a
                aria-haspopup="true"
                href="#"
                className="nav-link-icon nav-link"
                aria-expanded="false"
              >
                <i className="ni ni-settings-gear-65"></i>
                <span className="nav-link-inner--text d-lg-none">Settings</span>
              </a>
              <div
                tabIndex="-1"
                role="menu"
                aria-labelledby="navbar-default_dropdown_1"
                aria-hidden="true"
                className="dropdown-menu dropdown-menu-right"
              >
                <a href="#pablo" tabIndex="0" role="menuitem" className="dropdown-item">
                  Action
                </a>
                <a href="#pablo" tabIndex="0" role="menuitem" className="dropdown-item">
                  Another action
                </a>
                <div tabIndex="-1" className="dropdown-divider"></div>
                <a href="#pablo" tabIndex="0" role="menuitem" className="dropdown-item">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
