const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET: Signup page
router.get("/signup", (req, res) => {
  if (req.cookies.token) return res.redirect("/users");
  res.render("auth", { formType: "signup", error: null });
});

// GET: Login page
router.get("/login", (req, res) => {
  if (req.cookies.token) return res.redirect("/users");
  res.render("auth", { formType: "login", error: null });
});

// GET: Landing page
router.get("/", (req, res) => {
  res.render("landing");
});

// POST: Signup
router.post("/signup", async (req, res) => {
  const { email, password, confirmPassword, fullname, contact } = req.body;
  if (password !== confirmPassword) {
    return res.render("auth", { formType: "signup", error: "Passwords do not match" });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.render("auth", { formType: "signup", error: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({ email, password: hashedPassword, fullname, contact });

  const token = jwt.sign({ id: user._id }, "heyhey");
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/users");
});

// POST: Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.render("auth", { formType: "login", error: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.render("auth", { formType: "login", error: "Incorrect password" });
  }

  const token = jwt.sign({ id: user._id }, "heyhey");
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/users");
});

module.exports = router;
