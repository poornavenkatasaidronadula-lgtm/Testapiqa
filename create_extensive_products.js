const fs = require('fs');

const targetFile = 'src/data/products.js';

let products = [
  { id: 1, name: 'Blue Top', price: 500, category: 'Women', subcategory: 'Tops', brand: 'Polo', image: '/images/blue_top.png', rating: 4.2, reviews: 38, inStock: true, description: 'A beautiful blue top perfect for casual outings and everyday wear. Made with premium cotton blend fabric for maximum comfort.', color: 'Blue', size: ['S', 'M', 'L', 'XL'] },
  { id: 2, name: 'Men Tshirt', price: 400, category: 'Men', subcategory: 'Tshirts', brand: 'H&M', image: '/images/grey_tshirt.png', rating: 4.5, reviews: 62, inStock: true, description: 'Classic men\'s T-shirt with a relaxed fit. Ideal for everyday casual wear.', color: 'Grey', size: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 3, name: 'Sleeveless Dress', price: 1000, category: 'Women', subcategory: 'Dress', brand: 'Madame', image: '/images/pink_dress.png', rating: 4.7, reviews: 45, inStock: true, description: 'Elegant sleeveless dress for formal or semi-formal occasions.', color: 'Pink', size: ['S', 'M', 'L'] },
  { id: 4, name: 'Stylish Dress', price: 1500, category: 'Women', subcategory: 'Dress', brand: 'Biba', image: '/images/blue_stylish_dress.png', rating: 4.3, reviews: 28, inStock: true, description: 'Chic and stylish dress for modern women.', color: 'Blue', size: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 5, name: 'Winter Top', price: 600, category: 'Women', subcategory: 'Tops', brand: 'Polo', image: '/images/green_winter_top.png', rating: 4.1, reviews: 19, inStock: true, description: 'Warm and cozy winter top for cold seasons.', color: 'Green', size: ['S', 'M', 'L', 'XL'] },
  { id: 6, name: 'Summer White Top', price: 400, category: 'Women', subcategory: 'Tops', brand: 'H&M', image: '/images/white_summer_top.png', rating: 4.4, reviews: 51, inStock: true, description: 'Fresh and light summer top for warm days.', color: 'White', size: ['XS', 'S', 'M', 'L'] },
  { id: 7, name: 'Madame Top For Women', price: 1000, category: 'Women', subcategory: 'Tops', brand: 'Madame', image: '/images/yellow_madame_top.png', rating: 4.6, reviews: 33, inStock: true, description: 'Designer top from Madame collection for women.', color: 'Yellow', size: ['S', 'M', 'L', 'XL'] },
  { id: 8, name: 'Fancy Green Top', price: 700, category: 'Women', subcategory: 'Tops', brand: 'Biba', image: '/images/fancy_green_top.png', rating: 4.0, reviews: 22, inStock: true, description: 'Trendy green top with fancy design for special occasions.', color: 'Green', size: ['S', 'M', 'L'] },
  { id: 9, name: 'Blue Jeans Slim Fit', price: 1499, category: 'Men', subcategory: 'Jeans', brand: 'Mast & Harbour', image: '/images/men_blue_jeans.png', rating: 4.5, reviews: 88, inStock: true, description: 'Classic slim fit blue jeans for everyday wear.', color: 'Blue', size: ['28', '30', '32', '34', '36'] },
  { id: 10, name: 'Premium Polo T-Shirts', price: 1500, category: 'Men', subcategory: 'Tshirts', brand: 'Polo', image: '/images/men_red_polo.png', rating: 4.8, reviews: 105, inStock: true, description: 'Premium polo t-shirt with signature embroidery.', color: 'Red', size: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 11, name: 'Graphic Design Men T Shirt', price: 1389, category: 'Men', subcategory: 'Tshirts', brand: 'H&M', image: '/images/men_graphic_tee.png', rating: 4.2, reviews: 41, inStock: true, description: 'Bold graphic t-shirt with artistic design print.', color: 'Dark Blue', size: ['S', 'M', 'L', 'XL'] },
  { id: 12, name: 'Soft Stretch Jeans', price: 799, category: 'Men', subcategory: 'Jeans', brand: 'Mast & Harbour', image: '/images/men_navy_jeans.png', rating: 4.3, reviews: 55, inStock: true, description: 'Comfortable stretch jeans with modern slim fit.', color: 'Navy', size: ['28', '30', '32', '34'] },
  { id: 13, name: 'Frozen Tops For Kids', price: 278, category: 'Kids', subcategory: 'Tops & Shirts', brand: 'Babyhug', image: '/images/kids_frozen_top.png', rating: 4.6, reviews: 72, inStock: true, description: 'Fun Frozen-themed top for kids with colorful print.', color: 'Blue', size: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'] },
  { id: 14, name: 'Little Girls Mr. Panda Shirt', price: 1200, category: 'Kids', subcategory: 'Tops & Shirts', brand: 'Allen Solly Junior', image: '/images/kids_panda_shirt.png', rating: 4.7, reviews: 38, inStock: true, description: 'Adorable panda print shirt for little girls.', color: 'White', size: ['2-3Y', '4-5Y', '6-7Y'] },
  { id: 15, name: 'Kids Floral Dress', price: 890, category: 'Kids', subcategory: 'Dress', brand: 'Kookie Kids', image: '/images/kids_floral_dress.png', rating: 4.4, reviews: 29, inStock: true, description: 'Beautiful floral dress for little girls.', color: 'Multicolor', size: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 16, name: 'Sleeveless Unicorn Patch Gown', price: 1050, category: 'Kids', subcategory: 'Dress', brand: 'Babyhug', image: '/images/kids_floral_dress.png', rating: 4.9, reviews: 63, inStock: true, description: 'Magical unicorn patch gown for little princesses.', color: 'Pink', size: ['2-3Y', '4-5Y', '6-7Y'] },
  { id: 17, name: 'Cotton Silk Hand Block Print Saree', price: 3000, category: 'Women', subcategory: 'Saree', brand: 'Biba', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80', rating: 4.8, reviews: 27, inStock: true, description: 'Handcrafted block print saree in premium cotton silk.', color: 'Red', size: ['Free Size'] },
  { id: 18, name: 'Rust Red Linen Saree', price: 3500, category: 'Women', subcategory: 'Saree', brand: 'Madame', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80', rating: 4.6, reviews: 18, inStock: true, description: 'Elegant rust red linen saree for festive occasions.', color: 'Rust Red', size: ['Free Size'] }
];

let idCounter = 100;

// Adding exactly 5 for key Women/Men/Kids brands combinations
const configs = [
  { cat: 'Women', subcat: 'Tops', brands: ['Polo', 'H&M', 'Madame', 'Biba'], img: '/images/white_summer_top.png' },
  { cat: 'Men', subcat: 'Tshirts', brands: ['Polo', 'H&M', 'Mast & Harbour'], img: '/images/grey_tshirt.png' },
  { cat: 'Kids', subcat: 'Tops & Shirts', brands: ['Babyhug', 'Allen Solly Junior', 'Kookie Kids', 'H&M'], img: '/images/kids_frozen_top.png' }
];

configs.forEach(c => {
  c.brands.forEach(b => {
    for (let i = 1; i <= 5; i++) {
      products.push({
        id: idCounter++,
        name: `${b} ${c.cat} ${c.subcat} Collection V${i}`,
        price: Math.floor(Math.random() * 1000) + 500,
        category: c.cat,
        subcategory: c.subcat,
        brand: b,
        image: c.img,
        rating: parseFloat((Math.random() * 1 + 4).toFixed(1)),
        reviews: Math.floor(Math.random() * 100) + 10,
        inStock: true,
        description: `A great ${c.subcat} from ${b} specifically designed for ${c.cat}. High quality and durable.`,
        color: 'Multicolor',
        size: ['S', 'M', 'L']
      });
    }
  });
});

let jsContent = `export const products = ${JSON.stringify(products, null, 2)};

export const categories = [
  { id: 'women', name: 'Women', icon: '👗', subcategories: ['Dress', 'Tops', 'Saree'] },
  { id: 'men', name: 'Men', icon: '👔', subcategories: ['Tshirts', 'Jeans'] },
  { id: 'kids', name: 'Kids', icon: '🧒', subcategories: ['Dress', 'Tops & Shirts'] },
].map(cat => ({ ...cat, count: products.filter(p => p.category === cat.name).length }));

export const brands = [
  { name: 'Polo' }, { name: 'H&M' }, { name: 'Madame' }, { name: 'Mast & Harbour' },
  { name: 'Babyhug' }, { name: 'Allen Solly Junior' }, { name: 'Kookie Kids' }, { name: 'Biba' }
].map(b => ({ ...b, count: products.filter(p => p.brand === b.name).length }));
`;

fs.writeFileSync(targetFile, jsContent);
console.log("Successfully rebuilt products exactly per comprehensive criteria!");
