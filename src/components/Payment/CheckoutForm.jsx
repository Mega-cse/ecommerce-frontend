import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    // Create a payment method
    const { error: paymentError } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (paymentError) {
      setError(paymentError.message);
      setLoading(false);
      return;
    }

    // Mock response as if a successful payment was made
    try {
      // Here you would normally call your backend
      const response = {
        ok: true,
        json: async () => ({ success: true }), // Simulate a successful response
      };

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const paymentData = await response.json();

      if (paymentData.error) {
        setError(paymentData.error);
      } else {
        alert('Payment successful!');
        navigate('/order-confirmation'); // Navigate to confirmation page
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement className="card-element" />
      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="pay-button" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default CheckoutForm;