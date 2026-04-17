import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext, AuthContext } from '../App';
import { FiTrash2, FiShoppingBag, FiArrowLeft, FiPackage } from 'react-icons/fi';

const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [showAddressForm, setShowAddressForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    company: user?.company || '',
    address: user?.address || '',
    address2: user?.address2 || '',
    country: user?.country || 'India',
    state: user?.state || '',
    city: user?.city || '',
    zipcode: user?.zipcode || '',
    mobile: user?.mobile || '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-state">
            <div className="icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="btn-primary">
              <FiShoppingBag /> Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <div className="breadcrumb-inner">
            <Link to="/">Home</Link>
            <span>›</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Shopping Cart</span>
          </div>
        </div>
      </div>

      <div className="cart-page">
        <div className="container">
          <div style={{ marginBottom: '24px' }}>
            <Link to="/products" style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <FiArrowLeft /> Continue Shopping
            </Link>
          </div>
          <div className="cart-layout">
            {/* Items */}
            <div className="cart-items-section">
              <div className="cart-section-title">
                🛒 My Cart ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
              </div>
              {cartItems.map(item => (
                <div key={item.cartItemId || item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div>
                    <div className="cart-item-name">
                      {item.name}
                      {item.selectedSize && <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: '6px' }}>(Size: {item.selectedSize})</span>}
                    </div>
                    <div className="cart-item-price">Rs. {item.price.toLocaleString()}</div>
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => updateQty(item.cartItemId || item.id, item.qty - 1)}>−</button>
                      <span className="qty-value">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.cartItemId || item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <button className="cart-remove-btn" onClick={() => removeFromCart(item.cartItemId || item.id)} title="Remove">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <div className="cart-summary-header">🏷️ Order Summary</div>
              <div className="cart-summary-body">
                {cartItems.map(item => (
                  <div key={item.cartItemId || item.id} className="summary-row">
                    <span style={{ fontSize: '0.85rem' }}>{item.name} {item.selectedSize && `(${item.selectedSize})`} × {item.qty}</span>
                    <span>Rs. {(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span style={{ color: shipping === 0 ? '#16a34a' : 'inherit' }}>
                    {shipping === 0 ? 'FREE' : `Rs. ${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <div style={{ background: 'var(--orange-light)', padding: '10px 14px', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--primary)', margin: '8px 0' }}>
                    📦 Add Rs. {(500 - subtotal).toLocaleString()} more for FREE shipping!
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total</span>
                  <span className="amount">Rs. {total.toLocaleString()}</span>
                </div>
                <button className="checkout-btn" onClick={() => {
                  if (!user) setShowAuthModal(true);
                  else {
                    setShowAddressForm(true);
                  }
                }}>
                  🛍️ Proceed to Checkout
                </button>
                <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.78rem', color: 'var(--text-gray)' }}>
                  🔒 Secure checkout powered by SSL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && ReactDOM.createPortal(
        <>
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 9998 }} onClick={() => setShowAuthModal(false)} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '30px', borderRadius: '8px', zIndex: 9999, width: '90%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginBottom: '15px', color: '#000' }}>Checkout Information</h3>
            <p style={{ color: '#555', marginBottom: '24px' }}>Register / Login account to proceed on checkout.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/login" className="btn-primary" style={{ padding: '12px', textDecoration: 'none', background: 'var(--primary)', color: '#fff', borderRadius: '4px', fontWeight: 600, textAlign: 'center', justifyContent: 'center' }}>Register / Login</Link>
              <button onClick={() => setShowAuthModal(false)} style={{ padding: '12px', background: 'transparent', color: '#555', border: '1px solid #ccc', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', textAlign: 'center', display: 'block', width: '100%' }}>Cancel</button>
            </div>
          </div>
        </>,
        document.body
      )}

      {showAddressForm && ReactDOM.createPortal(
        <>
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 9998 }} onClick={() => setShowAddressForm(false)} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '30px', borderRadius: '8px', zIndex: 9999, width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--primary)', textAlign: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>ADDRESS INFORMATION</h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const newOrder = {
                user_email: user.email,
                items: cartItems,
                subtotal,
                shipping,
                total,
                address: formData,
                status: 'Processing'
              };
              
              fetch(`${API_URL}/api/orders`, {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(newOrder)
              }).then(res => res.json()).then(() => {
                  clearCart();
                  setShowAddressForm(false);
                  navigate('/orders');
              }).catch(err => {
                  alert("Failed to create order. Please try again.");
                  console.error(err);
              });
            }} style={{ textAlign: 'left' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">First name *</label>
                  <input type="text" className="form-input" required value={formData.firstName} onChange={e => setFormData(p => ({...p, firstName: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Last name *</label>
                  <input type="text" className="form-input" required value={formData.lastName} onChange={e => setFormData(p => ({...p, lastName: e.target.value}))} />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Company</label>
                <input type="text" className="form-input" value={formData.company} onChange={e => setFormData(p => ({...p, company: e.target.value}))} />
              </div>
              
              <div className="form-group">
                <label className="form-label">Address * (Street address, P.O. Box, Company name, etc.)</label>
                <input type="text" className="form-input" required value={formData.address} onChange={e => setFormData(p => ({...p, address: e.target.value}))} />
              </div>
              
              <div className="form-group">
                <label className="form-label">Address 2</label>
                <input type="text" className="form-input" value={formData.address2} onChange={e => setFormData(p => ({...p, address2: e.target.value}))} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Country *</label>
                  <select className="form-input" required value={formData.country} onChange={e => setFormData(p => ({...p, country: e.target.value}))}>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input type="text" className="form-input" required value={formData.state} onChange={e => setFormData(p => ({...p, state: e.target.value}))} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input type="text" className="form-input" required value={formData.city} onChange={e => setFormData(p => ({...p, city: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Zipcode *</label>
                  <input type="text" className="form-input" required value={formData.zipcode} onChange={e => setFormData(p => ({...p, zipcode: e.target.value}))} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input type="tel" className="form-input" required value={formData.mobile} onChange={e => setFormData(p => ({...p, mobile: e.target.value}))} />
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button type="button" style={{ flex: 1, padding: '12px', background: '#ccc', border: 'none', color: '#333', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }} onClick={() => setShowAddressForm(false)}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--primary)', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <FiPackage /> Place Order
                </button>
              </div>
            </form>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
