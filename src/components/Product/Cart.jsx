import React, { useState } from 'react'; 
import { useAuth } from '../AuthContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, setCartItems } = useAuth();
  const [address, setAddress] = useState(''); 
  const navigate = useNavigate();

  if (!Array.isArray(cartItems)) {
    return <p>Cart items are not available!!!</p>;
  }

  // Update the quantity of an item
  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove an item from the cart
  const removeItem = (itemId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item._id !== itemId)
    );
  };

  // Update the size of an item
  const updateSize = (itemId, newSize) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === itemId ? { ...item, size: newSize } : item
      )
    );
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => 
    total + (item.price * (item.quantity || 1)), 
    0
  );

  // Handle checkout
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
      <div className="left-card">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.image}
                    className="img-fluid rounded-start"
                    alt={item.title}
                    style={{ width: '30%', height: 'auto' }} 
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">
                      ${item.price.toFixed(2)} ({item.quantity || 1} x ${item.price.toFixed(2)})
                    </p>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: '30%' }}>
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
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className="right-card">
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
          <span>-$100.00</span>
        </div>
        <div className="price-detail">
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
