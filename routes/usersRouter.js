const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", isLoggedIn, async (req, res) => {
  const user = await userModel.findById(req.user.id);
  res.render("home", { user });
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
