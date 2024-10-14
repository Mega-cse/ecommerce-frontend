import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const MyOrder = () => {
  const { token, user } = useAuth();
  const userId = user?.id; // Ensure this is set correctly
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      console.log('Fetching orders for userId:', userId);

      if (!userId) {
        setError('User ID is not available. Please log in and try again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5001/api/orders/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log('Orders response:', response.data); // Log response data
        
        if (response.data.length === 0) {
          console.log('No orders found for this user.');
        }
        
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error.response ? error.response.data : error);
        setError(error.response?.data?.message || 'Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
        console.log('Loading state set to false');
      }
    };

    if (token) {
      fetchOrders();
    } else {
      console.log('No token available');
      setLoading(false);
    }
  }, [token, userId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Orders</h2>
      {error && <p>{error}</p>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={order._id}>
              <h4>Order #{index + 1}</h4>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <h5>Order Details:</h5>
              <ul>
                {order.details.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.name}</strong> - ${item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrder;
