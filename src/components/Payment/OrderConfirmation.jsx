import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Ensure this path is correct
import './Payment.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { clearCart } = useAuth(); // Use clearCart from context

  useEffect(() => {
    // Animation logic
    const burst = document.querySelector('.burst');
    if (burst) {
      burst.classList.add('animate');
    }

    // Clear cart items after animation
    const timer = setTimeout(() => {
      clearCart(); // Clear the cart items
      navigate('/'); // Redirect to home page
    }, 3000); // Adjust the delay as needed to match the animation duration

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [clearCart, navigate]);

  return (
    <div className="order-confirmation">
      <div className="burst"></div>
      <h2>Order Confirmation</h2>
      <p>Your order has been placed successfully!</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default OrderConfirmation;
