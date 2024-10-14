
import React from 'react';
import './Header.css'; 
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header>
      <div className="image-container">
                <Link to ='/product'class="navs" href="#">ExploreNow</Link>
          
    </div>
    </header>
  );
}

export default Header;