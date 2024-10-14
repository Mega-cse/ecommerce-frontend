import React, { useEffect, useState } from 'react';
import './Review.css'; // Import CSS for styling

// Array of image paths
const images = [
  "/images/sarah.jpg",
  "/images/mark.jpg",
  "/images/emily.jpg",
  "/images/john.jpg"
];

const testimonials = [
  {
    id: 1,
    text: "I absolutely love this product! The quality is fantastic and it arrived quickly.",
    author: "Jane D.",
    image: images[0], // Use the path from the array
  },
  {
    id: 2,
    text: "Great customer service! They helped me choose the perfect item.",
    author: "Mike S.",
    image: images[1], // Use the path from the array
  },
  {
    id: 3,
    text: "This is my go-to shop for all my needs. Highly recommend!",
    author: "Lisa K.",
    image: images[2], // Use the path from the array
  },
  {
    id: 4,
    text: "Fast shipping and the product exceeded my expectations. Will buy again!",
    author: "Robert T.",
    image: images[3], // Use the path from the array
  },
];

const ReviewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="testimonials-slider">
      <div className="testimonial">
        <img 
          src={testimonials[currentIndex].image} 
          alt={`${testimonials[currentIndex].author}`} 
          className="testimonial-image" 
        />
        <p>"{testimonials[currentIndex].text}"</p>
        <h4>- {testimonials[currentIndex].author}</h4>
      </div>
      <div className="indicators">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      

    </div>
  );
};

export default ReviewsSlider;