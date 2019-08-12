import React from 'react';
import { Link } from 'react-router-dom';
import { baseURL } from '../../bootstrap';

function Logo(props) {
  return (
    <div className="logo" title="Cinehub">
      <Link to="/" className="navbar-brand">
        <img src={baseURL + '/img/logo_200x200.png'} title="Cinehub" />
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
      </div>
    </nav>
  );
};

export default Header;
