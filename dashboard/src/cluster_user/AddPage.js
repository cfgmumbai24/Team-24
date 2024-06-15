import React, { useEffect, useState } from 'react';
import './AddPage.css';
import logo from '../logo.png';
import { useNavigate } from 'react-router-dom';
import config from '../config/config';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddPage() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  const navigateToHomePage = () => {
    navigate('/page');
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  // TODO:
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(`${config.BACKEND_URL}/product-request`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log('Image uploaded successfully:', response.data);
      setShowPopup(true);
      setTimeout(() => {
        navigateToHomePage();
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error('Error uploading image:', error);
      
    }
  };

  useEffect(() => {
    axios.get(`${config.BACKEND_URL}/category`).then(response => {
      setCategories(response.data.data.categories);
    }).catch(error => {
      toast("Enter valid credentials!");
    });
  }, []);

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
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="upload-product">Upload Product *</label>
            <input type="file" id="upload-product" name='image' onChange={handleImageChange} />
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
