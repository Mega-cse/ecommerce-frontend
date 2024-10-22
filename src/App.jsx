import { createContext, useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './components/Login/Login';
import Cart from './components/Product/Cart';
import ProductList from './components/Product/ProductList';
import Payment from './components/Payment/Payment';
import OrderConfirmation from './components/Payment/OrderConfirmation';
import Register from './components/Register/Register';;
import Profile from './components/Profile';
import { AuthProvider, useAuth } from './components/AuthContext'; 
import ForgotPassword from './components/Forgotpassword';
import PaymentOnline from './components/Payment/PaymentOnline';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './components/ResetPassword';
import MyOrder from './components/Payment/MyOrder';


export const CartContext = createContext();

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const addToCart = (product) => {
    if (!cartItems.find((item) => item.id === product.id)) {
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  useEffect(() => {
    axios.get('https://e-commerce-backend-6hq8.onrender.com/api/product/get')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartContext.Provider value={{ cartItems, setCartItems }}>
          <Navbar cartItems={cartItems} />
          <Routes>
            <Route path='/' element={<Header />} />
            <Route path='/product' element={<ProductList products={products} addToCart={addToCart} removeFromCart={removeFromCart} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cart' element={<Cart />} />

            {/* Protected Routes */}
            <Route 
              path='/payment' 
              element={<ProtectedRoute><Payment /></ProtectedRoute>} 
            />
            <Route 
              path='/order-confirmation' 
              element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} 
            />
            <Route 
              path='/profile' 
              element={<ProtectedRoute><Profile /></ProtectedRoute>} 
            />
            <Route 
              path='/forgot-password' 
              element={<ForgotPassword />} 
            />
            <Route 
              path='/payment-online' 
              element={<ProtectedRoute><PaymentOnline /></ProtectedRoute>} 

            />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Redirect to home if user is logged in and tries to access login */}
            <Route path='/login' element={<ProtectedRoute><Navigate to='/' /></ProtectedRoute>} />
            <Route path='/my-order' element={<MyOrder/>}/>
         
          </Routes>
         
        </CartContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
