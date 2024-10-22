import React, { useState } from 'react'; 
import { useAuth } from '../AuthContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, setCartItems } = useAuth();
  const [address, setAddress] = useState(''); 
  const navigate = useNavigate();

  if (!Array.isArray(cartItems)) {
    return <p>Cart items are not available!!!</p>;
  }

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item._id !== itemId)
    );
  };

  const updateSize = (itemId, newSize) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === itemId ? { ...item, size: newSize } : item
      )
    );
  };

  const totalPrice = cartItems.reduce((total, item) => 
    total + (item.price * (item.quantity || 1)), 
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const details = cartItems.map(item => ({
      name: item.title,
      price: item.price,
      quantity: item.quantity || 1,
    }));

    navigate('/payment', { state: { details, address } });
  };

  return (
    <div className="cart-container">
      <div className="cart-left">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item mb-3">
              <div className="item-row">
                <div className="item-image">
                  <img
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="item-details">
                  <h5 className="item-title">{item.title}</h5>
                  <p className="item-price">
                    ${item.price.toFixed(2)} ({item.quantity || 1} x ${item.price.toFixed(2)})
                  </p>
                  <div className="item-controls">
                    <select
                      value={item.quantity || 1}
                      onChange={(e) => updateQuantity(item._id, parseInt(e.target.value, 10))}
                      className="form-select"
                    >
                      {[1, 2, 3, 4, 5].map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <select
                      value={item.size || 'L'}
                      onChange={(e) => updateSize(item._id, e.target.value)}
                      className="form-select"
                    >
                      {['L', 'XL', 'XXL', 'XXXL'].map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <button onClick={() => removeItem(item._id)} className="btn btn-danger">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className="cart-right">
        <h3><u>Price Details:</u></h3>
        <div className="price-detail">
          <h6>Subtotal:</h6>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="price-detail">
          <h6>Shipping:</h6>
          <span style={{ color: 'red' }}>Free</span>
        </div>
        <div className="price-detail">
          <h6>Discount:</h6>
          <span>-$10.00</span>
        </div>
        < div className="price-detail">
          <h6>Total:</h6>
          <span>${(totalPrice - 100).toFixed(2)}</span>
        </div>
        <button className="checkout-button btn btn-primary" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;