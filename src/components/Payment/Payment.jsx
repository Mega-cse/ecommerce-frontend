import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Update the path accordingly
import './Payment.css';

const Payment = () => {
  const { user } = useAuth(); // Access user from AuthContext
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const details = location.state?.details; // Access payment details from location state

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePlaceOrder = async () => {
    const errors = [];
  
    // Validate inputs
    if (address.trim() === '') {
      errors.push('Please enter your address.');
    }
  
    if (paymentMethod === '') {
      errors.push('Please select a payment method.');
    }
  
    if (!details || details.length === 0) {
      errors.push('No payment details available.');
    }

    // Alert user if there are validation errors
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    // Check if userId is available
    const userId = user?.id; // Ensure userId is correctly accessed
    if (!userId) {
      alert('User ID is not available. Please log in and try again.');
      return;
    }
  
    // Prepare the order object
    const order = { address, paymentMethod, details };
  
    try {
      const response = await axios.post(`https://e-commerce-backend-6hq8.onrender.com/api/orders/create/${userId}`, order);
      if (response.status === 201) {
        navigate(paymentMethod === 'payOnline' ? '/payment-online' : '/order-confirmation', {
          state: { address, details }
        });
      } else {
        alert('Failed to place the order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order: ' + (error.response?.data?.message || error.message));
    }
  }    
  
  return (
    <div className="payment-container">
      <h2>Select Payment Method</h2>
      <div className="payment-methods">
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="payOnline"
            checked={paymentMethod === 'payOnline'}
            onChange={handlePaymentChange}
          />
          Pay Online <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/UPI-Logo.png" style={{ width: "50%" }} />
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="cashOnDelivery"
            checked={paymentMethod === 'cashOnDelivery'}
            onChange={handlePaymentChange}
          />
          Cash on Delivery <img src="https://atlas-content-cdn.pixelsquid.com/stock-images/money-one-hundred-dollar-bill-qvnka28-600.jpg" style={{ width: "50%" }} />
        </label>
      </div>

      {paymentMethod && (
        <div className="address-form">
          <textarea
            placeholder="Confirm your address here..."
            value={address}
            onChange={handleAddressChange}
            rows="4"
            style={{ width: '100%' }}
          ></textarea>
        </div>
      )}

      <button className="place-order-button" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Payment;
