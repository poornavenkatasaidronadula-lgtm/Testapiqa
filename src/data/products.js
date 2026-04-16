// Central product data for the entire site
export const products = [
  // Women - Dress
  { id: 1, name: 'Blue Top', price: 500, category: 'Women', subcategory: 'Tops', brand: 'Polo', image: '/images/blue_top.png', rating: 4.2, reviews: 38, inStock: true, description: 'A beautiful blue top perfect for casual outings and everyday wear. Made with premium cotton blend fabric for maximum comfort.', color: 'Blue', size: ['S', 'M', 'L', 'XL'] },
  { id: 2, name: 'Men Tshirt', price: 400, category: 'Men', subcategory: 'Tshirts', brand: 'H&M', image: '/images/grey_tshirt.png', rating: 4.5, reviews: 62, inStock: true, description: 'Classic men\'s T-shirt with a relaxed fit. Ideal for everyday casual wear.', color: 'Grey', size: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 3, name: 'Sleeveless Dress', price: 1000, category: 'Women', subcategory: 'Dress', brand: 'Madame', image: '/images/pink_dress.png', rating: 4.7, reviews: 45, inStock: true, description: 'Elegant sleeveless dress for formal or semi-formal occasions.', color: 'Pink', size: ['S', 'M', 'L'] },
  { id: 4, name: 'Stylish Dress', price: 1500, category: 'Women', subcategory: 'Dress', brand: 'Biba', image: '/images/blue_stylish_dress.png', rating: 4.3, reviews: 28, inStock: true, description: 'Chic and stylish dress for modern women.', color: 'Blue', size: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 5, name: 'Winter Top', price: 600, category: 'Women', subcategory: 'Tops', brand: 'Polo', image: '/images/green_winter_top.png', rating: 4.1, reviews: 19, inStock: true, description: 'Warm and cozy winter top for cold seasons.', color: 'Green', size: ['S', 'M', 'L', 'XL'] },
  { id: 6, name: 'Summer White Top', price: 400, category: 'Women', subcategory: 'Tops', brand: 'H&M', image: '/images/white_summer_top.png', rating: 4.4, reviews: 51, inStock: true, description: 'Fresh and light summer top for warm days.', color: 'White', size: ['XS', 'S', 'M', 'L'] },
  { id: 7, name: 'Madame Top For Women', price: 1000, category: 'Women', subcategory: 'Tops', brand: 'Madame', image: '/images/yellow_madame_top.png', rating: 4.6, reviews: 33, inStock: true, description: 'Designer top from Madame collection for women.', color: 'Yellow', size: ['S', 'M', 'L', 'XL'] },
  { id: 8, name: 'Fancy Green Top', price: 700, category: 'Women', subcategory: 'Tops', brand: 'Biba', image: '/images/fancy_green_top.png', rating: 4.0, reviews: 22, inStock: true, description: 'Trendy green top with fancy design for special occasions.', color: 'Green', size: ['S', 'M', 'L'] },
  // Men
  { id: 9, name: 'Blue Jeans Slim Fit', price: 1499, category: 'Men', subcategory: 'Jeans', brand: 'Mast & Harbour', image: 'https://via.placeholder.com/300x350/2193b0/ffffff?text=Blue+Jeans', rating: 4.5, reviews: 88, inStock: true, description: 'Classic slim fit blue jeans for everyday wear.', color: 'Blue', size: ['28', '30', '32', '34', '36'] },
  { id: 10, name: 'Premium Polo T-Shirts', price: 1500, category: 'Men', subcategory: 'Tshirts', brand: 'Polo', image: 'https://via.placeholder.com/300x350/cc2b5e/ffffff?text=Polo+Shirt', rating: 4.8, reviews: 105, inStock: true, description: 'Premium polo t-shirt with signature embroidery.', color: 'Red', size: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 11, name: 'Graphic Design Men T Shirt', price: 1389, category: 'Men', subcategory: 'Tshirts', brand: 'H&M', image: 'https://via.placeholder.com/300x350/1a1a2e/ffffff?text=Graphic+Tee', rating: 4.2, reviews: 41, inStock: true, description: 'Bold graphic t-shirt with artistic design print.', color: 'Dark Blue', size: ['S', 'M', 'L', 'XL'] },
  { id: 12, name: 'Soft Stretch Jeans', price: 799, category: 'Men', subcategory: 'Jeans', brand: 'Mast & Harbour', image: 'https://via.placeholder.com/300x350/4b79a1/ffffff?text=Stretch+Jeans', rating: 4.3, reviews: 55, inStock: true, description: 'Comfortable stretch jeans with modern slim fit.', color: 'Navy', size: ['28', '30', '32', '34'] },
  // Kids
  { id: 13, name: 'Frozen Tops For Kids', price: 278, category: 'Kids', subcategory: 'Tops & Shirts', brand: 'Babyhug', image: 'https://via.placeholder.com/300x350/00b4db/ffffff?text=Frozen+Kids', rating: 4.6, reviews: 72, inStock: true, description: 'Fun Frozen-themed top for kids with colorful print.', color: 'Blue', size: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'] },
  { id: 14, name: 'Little Girls Mr. Panda Shirt', price: 1200, category: 'Kids', subcategory: 'Tops & Shirts', brand: 'Allen Solly Junior', image: 'https://via.placeholder.com/300x350/ee9ca7/ffffff?text=Panda+Shirt', rating: 4.7, reviews: 38, inStock: true, description: 'Adorable panda print shirt for little girls.', color: 'White', size: ['2-3Y', '4-5Y', '6-7Y'] },
  { id: 15, name: 'Kids Floral Dress', price: 890, category: 'Kids', subcategory: 'Dress', brand: 'Kookie Kids', image: 'https://via.placeholder.com/300x350/f7971e/ffffff?text=Floral+Dress', rating: 4.4, reviews: 29, inStock: true, description: 'Beautiful floral dress for little girls.', color: 'Multicolor', size: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 16, name: 'Sleeveless Unicorn Patch Gown', price: 1050, category: 'Kids', subcategory: 'Dress', brand: 'Babyhug', image: 'https://via.placeholder.com/300x350/9b59b6/ffffff?text=Unicorn+Gown', rating: 4.9, reviews: 63, inStock: true, description: 'Magical unicorn patch gown for little princesses.', color: 'Pink', size: ['2-3Y', '4-5Y', '6-7Y'] },
  // Women - Saree
  { id: 17, name: 'Cotton Silk Hand Block Print Saree', price: 3000, category: 'Women', subcategory: 'Saree', brand: 'Biba', image: 'https://via.placeholder.com/300x350/c94b4b/ffffff?text=Block+Saree', rating: 4.8, reviews: 27, inStock: true, description: 'Handcrafted block print saree in premium cotton silk.', color: 'Red', size: ['Free Size'] },
  { id: 18, name: 'Rust Red Linen Saree', price: 3500, category: 'Women', subcategory: 'Saree', brand: 'Madame', image: 'https://via.placeholder.com/300x350/b34700/ffffff?text=Linen+Saree', rating: 4.6, reviews: 18, inStock: true, description: 'Elegant rust red linen saree for festive occasions.', color: 'Rust Red', size: ['Free Size'] },
];

export const categories = [
  { id: 'women', name: 'Women', icon: '👗', subcategories: ['Dress', 'Tops', 'Saree'], count: 10 },
  { id: 'men', name: 'Men', icon: '👔', subcategories: ['Tshirts', 'Jeans'], count: 4 },
  { id: 'kids', name: 'Kids', icon: '🧒', subcategories: ['Dress', 'Tops & Shirts'], count: 4 },
];

export const brands = [
  { name: 'Polo', count: 6 },
  { name: 'H&M', count: 5 },
  { name: 'Madame', count: 5 },
  { name: 'Mast & Harbour', count: 3 },
  { name: 'Babyhug', count: 4 },
  { name: 'Allen Solly Junior', count: 3 },
  { name: 'Kookie Kids', count: 3 },
  { name: 'Biba', count: 5 },
];
