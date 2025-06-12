const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Load favorites from file or create empty array
let favorites = [];
const FAVORITES_FILE = path.join(__dirname, 'favorites.json');

// Load existing favorites
try {
  favorites = JSON.parse(fs.readFileSync(FAVORITES_FILE, 'utf8'));
} catch (err) {
  favorites = [];
}

// Helper functions
function findProduct(productId) {
  return favorites.find(item => item.productId === productId);
}

function saveFavorites() {
  fs.writeFileSync(FAVORITES_FILE, JSON.stringify(favorites), 'utf8');
}

// Add endpoint to check favorite status
app.get('/check-favorite/:productId', (req, res) => {
  const productId = req.params.productId;
  const isFavorite = !!findProduct(productId);
  res.json({ isFavorite });
});

// Rest of your routes remain the same
app.get('/', (req, res) => {
  res.render("home");
});

app.get('/favourites', (req, res) => {
  res.render("favourites", { favorites });
});

app.get('/profile', (req, res) => {
  res.render("profile");
});

app.post('/toggle-favorite', (req, res) => {
  const product = req.body;
  const existing = findProduct(product.productId);

  if (existing) {
    favorites = favorites.filter(item => item.productId !== product.productId);
    res.json({ message: 'Removed from favorites', isFavorite: false });
  } else {
    favorites.push(product);
    res.json({ message: 'Added to favorites', isFavorite: true });
  }
  
  saveFavorites(); // Save to file after modification
});

app.listen(3000);