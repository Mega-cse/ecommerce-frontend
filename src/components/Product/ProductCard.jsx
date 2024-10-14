import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
//import './Product.css'

const ProductCard = ({ product }) => {
  const { user, cartItems, setCartItems } = useAuth();
  const navigate = useNavigate();

  // Local state to track if the product is in the cart
  const [inCart, setInCart] = useState(() => {
    return cartItems.some(item => item._id === product._id);
  });

  useEffect(() => {
    // Update local inCart state whenever cartItems changes
    setInCart(cartItems.some(item => item._id === product._id));
  }, [cartItems, product._id]);

  const handleAddToCart = () => {
    if (user) {
      setCartItems(prevCart => {
        // Check if the product is already in the cart
        const isAlreadyInCart = prevCart.some(item => item._id === product._id);
        if (!isAlreadyInCart) {
          return [...prevCart, { ...product, quantity: 1 }];
        }
        return prevCart; // Return the existing cart state if already in cart
      });
      setInCart(true); // Update local inCart state
    } else {
      navigate('/login', { state: { from: '/product' } });
    }
  };

  const handleRemoveFromCart = () => {
    setCartItems(prevCart => {
      const newCart = prevCart.filter(item => item._id !== product._id);
      return newCart; // Return new cart state
    });
    setInCart(false); // Update local inCart state
  };

  const ratingStars = () => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className={`fas fa-star ${i < Math.round(product.rating.rate) ? 'filled' : ''}`} 
         style={{ color: i < Math.round(product.rating.rate) ? 'orange' : 'gray' }} />
    ));
  };

  return (
    <div className="card mb-4" style={{ maxWidth: '300px', maxHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className="card-image-container" style={{ backgroundColor: 'white', padding: '40px', height: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={product.image} alt={product.title} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
      </div>
      <div style={{ fontSize: '14px', color: 'orange', textAlign: 'center' }}>
        {ratingStars()}
      </div>
      <div className="card-details" style={{ color: 'orange', padding: '10px', height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h6>{product.title}</h6>
          <p>${product.price.toFixed(2)}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          {inCart ? (
            <button onClick={handleRemoveFromCart} className="btn cart-button">Remove from Cart</button>
          ) : (
            <button onClick={handleAddToCart} className="btn cart-button">Add to Cart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
