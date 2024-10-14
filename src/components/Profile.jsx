import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import { useAuth } from './AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming user object is provided in AuthContext
  const [formData, setFormData] = useState({
    username: '', // Changed from name to username to match registration
    email: '',
    mobileNo: '',
    address: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`https://e-commerce-backend-6hq8.onrender.com/api/user/${user.id}`); // Fetch user profile using ID
        const userData = response.data.data; // Assuming the API response structure
        setFormData({
          username: userData.username, // Ensure these match your API response
          email: userData.email,
          mobileNo: userData.mobileNo,
          address: userData.address,
        });
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to load profile. Please try again.');
        navigate('/login'); // Navigate to login if user data fails to load
      }
    };

    fetchUserProfile();
  }, [user, navigate]);

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="profile-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            className='profilename'
            value={formData.username} // Correctly bind username to formData
            readOnly // Set to read-only
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email} // Correctly bind email to formData
            className='profilename'
            readOnly // Set to read-only
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo">Phone:</label>
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo} // Correctly bind mobileNo to formData
            className='profilename'
            readOnly // Set to read-only
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address} // Correctly bind address to formData
            className='profilename'
            readOnly // Set to read-only
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
