import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Product.css';

const ProductCard = ({ product }) => {
  const { user, cartItems, setCartItems } = useAuth();
  const navigate = useNavigate();

  const [inCart, setInCart] = useState(() => {
    return cartItems.some(item => item._id === product._id);
  });

  useEffect(() => {
    setInCart(cartItems.some(item => item._id === product._id));
  }, [cartItems, product._id]);

  const handleAddToCart = () => {
    if (user) {
      setCartItems(prevCart => {
        const isAlreadyInCart = prevCart.some(item => item._id === product._id);
        if (!isAlreadyInCart) {
          return [...prevCart, { ...product, quantity: 1 }];
        }
        return prevCart;
      });
      setInCart(true);
    } else {
      navigate('/login', { state: { from: '/product' } });
    }
  };

  const handleRemoveFromCart = () => {
    setCartItems(prevCart => {
      return prevCart.filter(item => item._id !== product._id);
    });
    setInCart(false);
  };

  const ratingStars = () => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className={`fas fa-star ${i < Math.round(product.rating.rate) ? 'filled' : ''}`} 
         style={{ color: i < Math.round(product.rating.rate) ? 'orange' : 'gray' }} />
    ));
  };

  return (
    <div className="card">
      <div className="card-image-container">
        <img src={product.image} alt={product.title} className="card-image" />
      </div>
      <div className="card-details">
        <div style={{ textAlign: 'center' }}>
          <h6>{product.title}</h6>
          <p>${product.price.toFixed(2)}</p>
        </div>
        <div className="rating">
          {ratingStars()}
        </div>
      </div>
      <div className="card-footer">
        {inCart ? (
          <button onClick={handleRemoveFromCart} className="btn">Remove from Cart</button>
        ) : (
          <button onClick={handleAddToCart} className="btn">Add to Cart</button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;