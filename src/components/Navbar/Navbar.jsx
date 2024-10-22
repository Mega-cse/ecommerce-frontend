import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { faBasketShopping, faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, cartItems = [] } = useAuth(); // Use a default empty array

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <Link to='/' className="nav-link" style={{ fontSize: "1.5em", fontWeight: 'bold' }}>
        <FontAwesomeIcon icon={faBasketShopping} style={{ marginRight: 10, fontSize: "2em", color: 'orange' }} />
        Shoppie
      </Link>
      <div className="mobile-menu-toggle" onClick={() => setShowMobileMenu(!showMobileMenu)}>
        <FontAwesomeIcon icon={faBars} style={{ fontSize: "1.5em", color: 'orange' }} />
      </div>
      <ul className={`nav navbar-nav ml-auto ${showMobileMenu ? 'active' : ''}`}>
        {user ? (
          <div className="user-menu">
            <button
              className="user-button"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ backgroundColor: "#ffa07a", marginRight: 40, fontSize: "1.5em", border: 'none', color: 'white', cursor: 'pointer' }}
            >
              {user.name}
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to='/profile' className="dropdown-item">Profile</Link>
              
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <li className="nav-item">
            <Link to='/login' className="nav-link btn btn-outline-dark" style={{ backgroundColor: "#ffa07a", marginRight: 40, fontSize: "1.5em" }}>
              Login
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link to='/cart' className="nav-link btn btn-outline-dark" style={{ backgroundColor: "#ffa07a", marginRight: 40, fontSize: "1.5em" }}>
            <FontAwesomeIcon icon={faShoppingCart} /> {cartItems.length}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
