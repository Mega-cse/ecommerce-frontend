import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Structure should include user ID
  const [token, setToken] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const clearCart = () => {
    setCartItems([]);
  };

  // Optional: Add a method to update user information if needed
  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,           // User data, should contain user ID and other details
    setUser,       // Function to set user data
    token,         // Bearer token for authorization
    setToken,      // Function to set token
    cartItems,     // Cart items state
    setCartItems,  // Function to set cart items
    clearCart,     // Function to clear the cart
    updateUser,    // Function to update user information
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
