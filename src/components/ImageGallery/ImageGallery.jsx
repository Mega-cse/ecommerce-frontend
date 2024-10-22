import { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = () => {
  const images = [
    {
      src: 'https://assets.tatacliq.com/medias/sys_master/images/51869116956702.jpg',
      title: 'Image Title 1',
      description: 'Image Description 1'
    },
    {
      src: 'https://assets.tatacliq.com/medias/sys_master/images/51869117022238.jpg',
      title: 'Image Title 2',
      description: 'Image Description 2'
    },
    {
      src: 'https://assets.tatacliq.com/medias/sys_master/images/51889194860574.jpg',
      title: 'Image Title 3',
      description: 'Image Description 3'
    },
    {
      src: 'https://assets.tatacliq.com/medias/sys_master/images/51889194336286.jpg',
      title: 'Image Title 4',
      description: 'Image Description 4'
    },
    {
      src: 'https://assets.tatacliq.com/medias/sys_master/images/51889194270750.jpg',
      title: 'Image Title 5',
      description: 'Image Description 5'
    },
    {
      src: 'https://assets.tatacliq.com/medias/sys_master/images/51889190699038.jpg',
      title: 'Image Title 6',
      description: 'Image Description 6'
    }
  ];

  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim() === '') {
      alert('Invalid email address. Please enter a valid email address.');
    } else {
      alert(`Email successfully submitted: ${email}`);
      setEmail('');
    }
  };

  return (
    <>
    
      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={index} className="image-box">
            <img src={image.src} alt={image.title} />
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <h1>Sign up to our newsletter</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ fontSize: 18, width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input 
              value={email} 
              onChange={(event) => setEmail(event.target.value)} 
              placeholder="Enter your email here" 
              style={{ width: '150%', height: 50, padding: 10, textAlign: 'center', marginBottom: 10, border: '1px solid #ccc', borderRadius: 5 }} 
            />
          </label>
          <button type="submit" style={{ width: '100%', maxWidth: '200px', height: 40, padding: 10, fontSize: 16, backgroundColor: '#ffa07a', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer' }}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ImageGallery;
