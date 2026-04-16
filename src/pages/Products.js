import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products, brands } from '../data/products';
import ProductCard from '../components/ProductCard';
import { FiSearch } from 'react-icons/fi';

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="toast">
      <span className="toast-icon">🛒</span>
      <span>{message}</span>
    </div>
  );
}

export default function Products() {
  const { category } = useParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [openGroups, setOpenGroups] = useState({ Women: true, Men: true, Kids: true });
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category.charAt(0).toUpperCase() + category.slice(1));
    }
  }, [category]);

  const showToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
  };

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const toggleGroup = (g) => setOpenGroups(prev => ({ ...prev, [g]: !prev[g] }));

  let filtered = products;
  if (search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (selectedCategory && selectedCategory !== 'All') {
    filtered = filtered.filter(p =>
      p.category.toLowerCase() === selectedCategory.toLowerCase() ||
      p.subcategory.toLowerCase() === selectedCategory.toLowerCase()
    );
  }
  if (selectedBrand) {
    filtered = filtered.filter(p => p.brand === selectedBrand);
  }
  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sortBy === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const categoryGroups = [
    { label: 'Women', subs: ['Dress', 'Tops', 'Saree'] },
    { label: 'Men', subs: ['Tshirts', 'Jeans'] },
    { label: 'Kids', subs: ['Dress', 'Tops & Shirts'] },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <div className="breadcrumb-inner">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Products</span>
            {selectedCategory !== 'All' && (
              <>
                <span>›</span>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{selectedCategory}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="search-wrapper">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button><FiSearch /> Search</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="products-page-layout">
          {/* Sidebar */}
          <aside className="sidebar">
            {/* Category */}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                🗂️ Category
              </div>
              <div className="sidebar-card-body">
                <div
                  className={`sidebar-category-item ${selectedCategory === 'All' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('All')}
                >
                  All Products
                  <span className="count">{products.length}</span>
                </div>
                {categoryGroups.map(group => (
                  <div key={group.label} className="category-group">
                    <div className="category-group-header" onClick={() => toggleGroup(group.label)}>
                      {group.label}
                      <span>{openGroups[group.label] ? '▲' : '▼'}</span>
                    </div>
                    {openGroups[group.label] && group.subs.map(sub => (
                      <div
                        key={sub}
                        className={`sidebar-brand-item ${selectedCategory === sub ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(sub)}
                        style={selectedCategory === sub ? { color: 'var(--primary)', background: 'var(--orange-light)' } : {}}
                      >
                        {sub}
                        <span>{products.filter(p => p.subcategory === sub).length}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                🏷️ Brands
              </div>
              <div className="sidebar-card-body">
                <div
                  className={`sidebar-category-item ${selectedBrand === '' ? 'active' : ''}`}
                  onClick={() => setSelectedBrand('')}
                >
                  All Brands
                  <span className="count">{brands.length}</span>
                </div>
                {brands.map(brand => (
                  <div
                    key={brand.name}
                    className={`sidebar-brand-item ${selectedBrand === brand.name ? 'active' : ''}`}
                    onClick={() => setSelectedBrand(brand.name)}
                    style={selectedBrand === brand.name ? { color: 'var(--primary)', background: 'var(--orange-light)' } : {}}
                  >
                    {brand.name}
                    <span>({brand.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <div>
            <div className="products-toolbar">
              <div className="products-count">
                Showing <span>{filtered.length}</span> of <span>{products.length}</span> products
              </div>
              <select
                className="sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="default">Sort by: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
                <button
                  className="btn-primary"
                  onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedBrand(''); }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} showToast={showToast} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(t => (
          <Toast key={t.id} message={t.msg} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </>
  );
}
