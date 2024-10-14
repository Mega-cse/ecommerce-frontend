import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useLocation } from 'react-router-dom';
//import './Product.css'

const ProductList = ({ products, addToCart, removeFromCart }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
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
    if (category) {
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
    setFilteredProducts(filteredProducts);
  }, [category, products]);

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  return (
    <div className="row ">
      <div className="col-md-3 sidebar px-5 py-5">
        <h4>Top Categories</h4>
        <div className="category-filter px-5 py-3">
          <ul>
            <li>
              <img src="data:image/jpeg;base64,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" alt="Men" style={{width:'50%'}} />
              <span>Men</span>
              <input
                type="checkbox"
                name="category"
                value="men"
                checked={category === 'men'}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
            </li>
            <li>
              <img src="https://cdn.pixabay.com/photo/2024/02/14/05/34/girl-8572400_640.png"style={{width:'40%'}} alt="Women" />
              <span>Women</span>
              <input
                type="checkbox"
                name="category"
                value="women"
                checked={category === 'women'}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
            </li>
            <li>
              <img src="data:image/jpeg;base64,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"style={{width:'20%'}}alt="accessories"/>
              <span>Accessories</span>
              <input
                type="checkbox"
                name="category"
                value="accessories"
                checked={category === 'accessories'}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
            </li>
            <li>
              <img src="https://i.pinimg.com/736x/e9/cb/b2/e9cbb26a7f5495c98439335fafdfae6b.jpg" style={{width:'20%'}} alt="Electronics" />
              <span>Electronics</span>
              <input
                type="checkbox"
                name="category"
                value="electronics"
                checked={category === 'electronics'}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="col-md-9 products">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-mb-4">
              <ProductCard
                product={product}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;