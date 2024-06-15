import React from 'react';
import './page.css';
import logo from '../logo.png';
import add from '../add.png';
import view from '../view.png';

function ClusterUserPage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>JANARDAN PRASAD MEMORIAL SOCIETY</h1>
        <div className="user-info">
          <div className="user-icon">UA</div>
          <div className="user-name">User ABC</div>
        </div>
      </header>
      <main>
        <div className="cluster-user-menu-title">Cluster User Menu</div>
        <div className="cluster-user-menu">
          <button className="menu-button">
            <img src={add} className="button-icon" alt="Add" />
            <span className='button-text'>Add Product</span>
          </button>
          <button className="menu-button">
            <img src={view} className="button-icon" alt="View" />
            <span className='button-text'>View Product</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default ClusterUserPage;
