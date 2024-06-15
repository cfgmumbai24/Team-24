import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewPage.css';
import logo from '../logo.png';
import Card from './card';
 // Assuming you have the terracota image in your assets

function ViewUserPage() {
  
    const data = [
        {title: "Hello", description: "text", status: "SOMETHING"},
        {title: "Hello", description: "text", status: "SOMETHING"},
        {title: "Hello", description: "text", status: "SOMETHING"},
    ]

    const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate('/');
  };
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
    

        {/* Cards Section */}
        <div className="container mx-auto mt-8 mb-8 px-4 flex flex-wrap justify-evenly">
      {/* <div>
        <h1>Admin Dashboard</h1>
      </div> */}
      {data.map(d => {
          return <Card card={d}/>

      }
      )}
      <button className="back-button" onClick={navigateToHomePage}>Go Back</button>
      
    </div>
      </main>
    </div>
  );
}

export default ViewUserPage;
