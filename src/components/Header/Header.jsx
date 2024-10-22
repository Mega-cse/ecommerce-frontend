
import React from 'react';
import './Header.css'; 
import { Link } from 'react-router-dom';
import ImageGallery from '../ImageGallery/ImageGallery';
import ReviewsSlider from '../Testimonial/ReviewsSlider';
import Footer from '../Footer/Footer';



function Header() {
  return (
    <header>
      <div className="image-container">
                <Link to ='/product'class="explore" href="#">ExploreNow</Link>
          
    </div>
    <ImageGallery />
       <ReviewsSlider/>
   
       
          <Footer />
         
    </header>
    
  );
}

export default Header;