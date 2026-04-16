import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';

export default function ProductCard({ product, showToast }) {
  const { addToCart, wishlist, toggleWishlist } = useContext(CartContext);
  const isWishlisted = wishlist.find(p => p.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    if (showToast) showToast(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    if (showToast) showToast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="product-overlay">
          <button className="overlay-btn" onClick={handleAddToCart}>
            <FiShoppingCart /> Add to Cart
          </button>
          <Link to={`/product/${product.id}`} className="overlay-btn secondary">
            <FiEye /> View Product
          </Link>
        </div>
        <button
          className={`wishlist-btn${isWishlisted ? ' active' : ''}`}
          onClick={handleWishlist}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <FiHeart />
        </button>
      </div>
      <div className="product-card-body">
        <div className="product-category-tag">{product.category} — {product.subcategory}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price-row">
          <span className="product-price">Rs. {product.price.toLocaleString()}</span>
          <div className="product-rating">
            {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
            <span style={{ color: '#aaa', marginLeft: 4 }}>({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
