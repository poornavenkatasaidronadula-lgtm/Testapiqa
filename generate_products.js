const fs = require('fs');

const file = 'src/data/products.js';
let content = fs.readFileSync(file, 'utf8');

const additionalMen = Array.from({length: 8}).map((_, i) => 
  `  { id: ${20+i}, name: 'Men Casual Wear V${i+1}', price: ${800 + i*100}, category: 'Men', subcategory: 'Tshirts', brand: 'H&M', image: '/images/grey_tshirt.png', rating: 4.5, reviews: ${10+i}, inStock: true, description: 'Comfortable men casual wear.', color: 'Grey', size: ['S', 'M', 'L', 'XL'] }`
).join(',\n');

const additionalKids = Array.from({length: 8}).map((_, i) => 
  `  { id: ${30+i}, name: 'Kids Fun Outfit V${i+1}', price: ${400 + i*50}, category: 'Kids', subcategory: 'Tops & Shirts', brand: 'Babyhug', image: '/images/kids_frozen_top.png', rating: 4.8, reviews: ${20+i}, inStock: true, description: 'Fun and colorful kids outfit.', color: 'Multi', size: ['2-3Y', '4-5Y'] }`
).join(',\n');

const additionalWomen = Array.from({length: 6}).map((_, i) => 
  `  { id: ${40+i}, name: 'Women Elegant Dress V${i+1}', price: ${1200 + i*100}, category: 'Women', subcategory: 'Dress', brand: 'Madame', image: '/images/pink_dress.png', rating: 4.6, reviews: ${30+i}, inStock: true, description: 'Beautiful elegant dress.', color: 'Pink', size: ['S', 'M', 'L'] }`
).join(',\n');

content = content.replace('];\n\nexport const categories', 
`,\n${additionalMen},\n${additionalKids},\n${additionalWomen}\n];\n\nexport const categories`);

fs.writeFileSync(file, content);
console.log("Successfully added products");
