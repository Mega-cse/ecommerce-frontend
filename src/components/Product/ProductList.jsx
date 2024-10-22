import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useLocation } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ products, addToCart, removeFromCart }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get('category');
    if (category) {
      setCategory(category);
    }
  }, [location.search]);

  useEffect(() => {
    let filteredProducts = products;

    // Filter by category
    if (category && category !== 'all') {
      if (category === 'men') {
        filteredProducts = filteredProducts.filter((product) => product.category === "men's clothing");
      } else if (category === 'women') {
        filteredProducts = filteredProducts.filter((product) => product.category.includes("women's clothing"));
      } else if (category === 'accessories') {
        filteredProducts = filteredProducts.filter((product) => product.category.includes('jewelery'));
      } else if (category === 'electronics') {
        filteredProducts = filteredProducts.filter((product) => product.category.includes('electronics'));
      }
    }

    // Filter by price range
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    setFilteredProducts(filteredProducts);
  }, [category, priceRange, products]);

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
  };

  return (
    <div className="product-list-container">
      <div className="filter-section">          
        <div className="category-filter">
          <ul>
            <li onClick={() => handleCategoryChange('all')} style={{ color: 'blue' }}>
              <img src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Men" />
              <span>All</span>
            </li>
            <li onClick={() => handleCategoryChange('men')} style={{ color: 'blue' }}>
            <img src="https://t4.ftcdn.net/jpg/01/88/36/45/360_F_188364539_a9ymnQnUOIvio7pisoYdaX9yQTdZBuCb.jpg" alt="Men" />
              <span>Men</span>
            </li>
            <li onClick={() => handleCategoryChange('women')} style={{ color: 'blue' }}>
            <img src="https://cdn.pixabay.com/photo/2024/02/14/05/34/girl-8572400_640.png" alt="Women" />
             
              <span>Women</span>
            </li>
            <li onClick={() => handleCategoryChange('accessories')} style={{ color: 'blue' }}>
            <img src="https://shyamsundarco.com/images/online_jewellery/yellowgold/Necklace/9/cr.jpg?v=21102024133" alt="Accessories" />
             
              <span>Accessories</span>
            </li>
            <li onClick={() => handleCategoryChange('electronics')} style={{ color: 'blue' }}>
            <img src="https://i.pinimg.com/736x/e9/cb/b2/e9cbb26a7f5495c98439335fafdfae6b.jpg" alt="Electronics" />
       
              <span>Electronics</span>
            </li>
          </ul>
        </div>

        <div className="price-filter">
          <label htmlFor="price-range">Price Range:</label>
          <select id="price-range" value={priceRange} onChange={handlePriceChange}>
            <option value="">Select Price Range</option>
            <option value="0-50">$0 - $50</option>
            <option value="51-100">$51 - $100</option>
            <option value="101-200">$101 - $200</option>
            <option value="201-500">$201 - $500</option>
            <option value="501-1000">$501 - $1000</option>
          </select>
        </div>
      </div>

      <div className="products">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {filteredProducts.length === 0 ? (
            <div style={{ color: 'red', textAlign: 'center', width: '100%' }}>
              No products found in this price range.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="col-mb-4">
                <ProductCard
                  product={product}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;