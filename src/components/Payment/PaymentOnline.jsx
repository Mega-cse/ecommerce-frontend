import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'; // Import your CheckoutForm component

// Replace with your actual publishable key
const stripePromise = loadStripe('pk_test_51PxSZpRs8NL4kngvFVsI96ZuKq3XURAw9ZDdvfRNlNXbiOjakBsOmD1GNFwKsMc7KCGIqRvn3Nm6wJYDwUGDTMwe00038l6IYH');

const PaymentOnline = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { address, details } = location.state || {};

  // Check if details are available
  if (!details || details.length === 0) {
    return <div>Error: Payment details are missing.</div>;
  }

  const totalAmount = details.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Create a formData object to pass to the CheckoutForm
  const formData = { address, totalAmount };

  return (
    <div style={{
      width: '50%',
      margin: '20px auto',
      padding: '20px',
      borderRadius: '10px',
      border: '1px solid #ddd',
      backgroundColor: '#f9f9f9'
    }}>
      <h1 style={{ textAlign: 'center' }}>Payment Details</h1>
      <ul>
        {details.map(item => (
          <li key={item.name}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>

      <Elements stripe={stripePromise}>
        <CheckoutForm formData={formData} />
      </Elements>
    </div>
  );
};

export default PaymentOnline;
