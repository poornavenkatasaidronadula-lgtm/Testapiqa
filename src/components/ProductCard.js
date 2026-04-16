import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';

export default function ProductCard({ product, showToast }) {
  const { addToCart, wishlist, toggleWishlist } = useContext(CartContext);
  const isWishlisted = wishlist.find(p => p.id === product.id);

  const [showModal, setShowModal] = React.useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    if (showToast) showToast(`${product.name} added to cart!`);
    setShowModal(true);
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
      {showModal && (
        <>
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 9998 }} onClick={() => setShowModal(false)} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '30px', borderRadius: '8px', zIndex: 9999, width: '90%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '3rem', color: '#16a34a', marginBottom: '10px' }}>✓</div>
            <h3 style={{ marginBottom: '10px' }}>Added!</h3>
            <p style={{ color: '#555', marginBottom: '24px' }}>Your product has been added to cart.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
               <Link to="/cart" className="btn-primary" style={{ padding: '10px 20px', textDecoration: 'none', background: 'var(--primary)', color: '#fff', borderRadius: '4px', border: 'none', fontWeight: 600 }}>View Cart</Link>
               <button onClick={() => setShowModal(false)} style={{ padding: '10px 20px', background: '#e0e0e0', color: '#333', borderRadius: '4px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Continue</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
