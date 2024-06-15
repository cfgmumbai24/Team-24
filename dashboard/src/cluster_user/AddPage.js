import React, { useState } from 'react';
import './AddPage.css';
import logo from '../logo.png';
import { useNavigate } from 'react-router-dom';

function AddPage() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const navigateToHomePage = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here (e.g., API call, validation)
    // For demo purposes, just set showPopup to true after submission
    setShowPopup(true);

    // Simulate redirection after submission (adjust timeout as needed)
    setTimeout(() => {
      navigateToHomePage();
    }, 1000); // Redirect after 2 seconds
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
        <h2>Add Product</h2>
        <form className="view-product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="model-used">Model Used *</label>
            <select id="model-used">
              <option value="terracotta-user">Terracotta User</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="upload-product">Upload Product *</label>
            <input type="file" id="upload-product" />
          </div>
          <div className="form-group">
            <label htmlFor="product-remarks">Product Remarks</label>
            <input type="text" id="product-remarks" />
          </div>
          <div className="form-group">
            <label htmlFor="approval-pending-by">Approval Pending By</label>
            <input type="text" id="approval-pending-by" value="Sub Admin" readOnly disabled />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>

        {/* Popup for Sent for Approval */}
        {showPopup && (
          <div className="popup">
            <p>Sent for Approval!!</p>
          </div>
        )}

        <button className="back-button" onClick={navigateToHomePage}>Go Back</button>
      </main>
    </div>
  );
}

export default AddPage;
