import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewPage.css';
import logo from '../logo.png';
import Card from './card';
import { useState } from 'react';
import config from '../config/config';
import axios from 'axios';
import { toast } from 'react-toastify';
 // Assuming you have the terracota image in your assets

function ViewUserPage() {
  
    const [requests, setRequests] = useState([]);
    useEffect(()=>{axios.get(`${config.BACKEND_URL}/product-request/cluster-user`,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then(response=>{
      setRequests(response.data.data.requests)
      }).catch(error =>{
        toast("enter valid credentials");
        console.log(error);
      })
    }, []);
    


    const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate('/page');
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
      {requests.map(r => {
          return <Card key={r._id} card={r}/>
      }
      )}
      
    </div>
    <button className="back-button" onClick={navigateToHomePage}>Go Back</button>
      </main>
    </div>
  );
}

export default ViewUserPage;
