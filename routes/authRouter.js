const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendVerificationEmail = require("../utils/send_veri_email");

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
  
  const isIITMandiEmail =
    email.endsWith("@iitmandi.ac.in") || email.endsWith("@students.iitmandi.ac.in");

  const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const isValidPhone = /^\d{10}$/.test(contact);

  if (!fullname || !contact || !email || !password || !confirmPassword) {
    return res.render("auth", {
      formType: "signup",
      error: "All fields are required",
    });
  }

  if (!isIITMandiEmail) {
    return res.render("auth", {
      formType: "signup",
      error: "Only IIT Mandii emails are allowed",
    });
  }

  if (!isValidPhone) {
    return res.render("auth", {
      formType: "signup",
      error: "Phone number must be 10 digits",
    });
  }

  if (!isValidPassword) {
    return res.render("auth", {
      formType: "signup",
      error:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
    });
  }

  if (password !== confirmPassword) {
    return res.render("auth", { formType: "signup", error: "Passwords do not match" });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.render("auth", { formType: "signup", error: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const token = jwt.sign(
    { email, fullname, contact, password: hashedPassword },
    "verification_secret",
    { expiresIn: "24h" }
  );

  const link = `http://localhost:3000/verify-email?token=${token}`;
  await sendVerificationEmail(email, token);
  return res.render("verifynotice");

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

  if (!user.emailVerified) {
    return res.render("auth", {
      formType: "login",
      error: "Please verify your email before logging in.",
    });
  }
const token = jwt.sign({ id: user._id }, "heyhey");
res.cookie("token", token, { httpOnly: true });
return res.redirect("/users");

});

router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  try {
    const data = jwt.verify(token, "verification_secret");

    const existingUser = await userModel.findOne({ email: data.email });
    if (existingUser) {
      return res.send("Account already verified."); // already verified
    }
    await userModel.create({
      email: data.email,
      fullname: data.fullname,
      contact: data.contact,
      password: data.password,
      emailVerified: true,
    });

    return res.redirect("/login"); // redirect to login after successful verification
  } catch (err) {
    return res.send("❌ Invalid or expired verification link.");
  }
});



module.exports = router;
