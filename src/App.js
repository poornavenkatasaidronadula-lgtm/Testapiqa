import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import TestCases from './pages/TestCases';
import Orders from './pages/Orders';

export const CartContext = createContext();
export const AuthContext = createContext();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('ae_cart');
    const savedUser = localStorage.getItem('ae_user');
    const savedWishlist = localStorage.getItem('ae_wishlist');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  const addToCart = (product, quantity = 1, size = null) => {
    setCartItems(prev => {
      const cartItemId = size ? `${product.id}-${size}` : `${product.id}`;
      const existing = prev.find(i => (i.cartItemId || `${i.id}`) === cartItemId);
      let updated;
      if (existing) {
        updated = prev.map(i => (i.cartItemId || `${i.id}`) === cartItemId ? { ...i, qty: i.qty + quantity } : i);
      } else {
        updated = [...prev, { ...product, cartItemId, selectedSize: size, qty: quantity }];
      }
      localStorage.setItem('ae_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => {
      const updated = prev.filter(i => (i.cartItemId || `${i.id}`) !== cartItemId);
      localStorage.setItem('ae_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const updateQty = (cartItemId, qty) => {
    if (qty < 1) return;
    setCartItems(prev => {
      const updated = prev.map(i => (i.cartItemId || `${i.id}`) === cartItemId ? { ...i, qty } : i);
      localStorage.setItem('ae_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('ae_cart');
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      const updated = exists ? prev.filter(i => i.id !== product.id) : [...prev, product];
      localStorage.setItem('ae_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('ae_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ae_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, wishlist, toggleWishlist }}>
        <Router>
          <ScrollToTop />
          <div className="app-wrapper">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/test-cases" element={<TestCases />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
