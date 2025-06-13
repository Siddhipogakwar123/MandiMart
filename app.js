const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const allProducts = require('./data/products');


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


//route for the profile page
app.get('/profile', (req, res) => {
  res.render("profile", {
  user: {
    name: "Himesh Chandrakar",
    email: "b23.com",
    address: "123, seher",
    phone: "+91-xxxxxxxx",
    otherInfo: "xyz",
    productsCount: 15,
    purchasesCount: 8
  }
});
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

//route for products
app.get('/my_products', (req, res) => {
  // const currentUserId = req.session.user.id;
  let currentUserId= "user123"; //temp
  const userProducts = allProducts.filter(p => p.userId === currentUserId);
  res.render('my_products', { products: userProducts });
});

//to add new products
app.post('/add-product', (req, res) => {
  const { title, price, description } = req.body;
  allProducts.push({
    id: Date.now().toString(),
    title,
    price,
    description,
    ownerId: req.auth?.userId || "guest",
  });
  res.redirect('/my_products'); // or /profile
});

//to render my purchases
app.get('/my_purchases', (req, res) => {
  const currentUserId = "user123"; // temporary ID
  const purchasedProducts = allProducts.filter(p => p.purchaseBy === currentUserId);
  res.render('my_purchases', { products: purchasedProducts });
});



app.listen(3000);