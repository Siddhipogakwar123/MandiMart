const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const isLoggedIn = require("../middlewares/isLoggedIn");

const Product = require("../models/product_model"); // import your product model

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    const products = await Product.find({}); // get all products from DB
    res.render("home", { user, products });  // pass products to home.ejs
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading home page");
  }
});


router.get("/profile", isLoggedIn, async (req, res) => {
  const user = await userModel.findById(req.user.id);
  res.render("profile", { user });
});

router.get("/cart", isLoggedIn, async (req, res) => {
  const user = await userModel.findById(req.user.id);
  res.render("cart", { cart: user.cart });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
