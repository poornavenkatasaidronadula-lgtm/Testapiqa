const sharp = require('sharp');
const src = 'C:/Users/saidr/.gemini/antigravity/brain/901341fd-7da5-460c-87d6-506f7b1366f9/testapiqa_favicon_1776517104158.png';

sharp(src).resize(32, 32).toFile('public/favicon-32x32.png', (e, i) => console.log('32x32:', e || 'done'));
sharp(src).resize(180, 180).toFile('public/apple-touch-icon.png', (e, i) => console.log('apple-touch:', e || 'done'));
sharp(src).resize(192, 192).toFile('public/logo192.png', (e, i) => console.log('192x192:', e || 'done'));
sharp(src).resize(512, 512).toFile('public/logo512.png', (e, i) => console.log('512x512:', e || 'done'));
