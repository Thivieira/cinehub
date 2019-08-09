import React from 'react';
import Header from './components/Header.jsx';

export default function Layout(props) {
  return (
    <div>
      <Header />
      <div className="site-container">
        <div className="container">{props.children}</div>
      </div>
    </div>
  );
}
