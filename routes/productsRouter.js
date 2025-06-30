const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product_model'); 

// GET: Add product form (protected)
router.get('/add-product', isLoggedIn, (req, res) => {
  res.render('add_product');
});

// POST: Handle product form submission
router.post('/add-product', isLoggedIn, async (req, res) => {
  const { title, description, price } = req.body;
  await productModel.create({
    title,
    description,
    price,
    createdAt: new Date(),
    userId: req.user.id,
    purchaseBy: "-1"
  });
  res.redirect('/users'); // or /my_products
});

module.exports = router;
