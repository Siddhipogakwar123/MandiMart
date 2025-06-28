// const express = require("express");
// const router = express.Router();
// const User = require("../models/user_model");
// const isLoggedIn = require("../middlewares/isLoggedIn"); // make sure path is correct

// // ✅ Check if a product is already in the user's favorites
// router.get("/check-favorite/:productId", isLoggedIn, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     const productId = req.params.productId;

//     const isFavorite = user.favourite.some(item => item.productId === productId);
//     res.json({ isFavorite });
//   } catch (err) {
//     console.error("Check favorite error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ✅ Toggle favorite (add/remove)
// router.post("/toggle-favorite", isLoggedIn, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     const product = req.body;

//     const index = user.favourite.findIndex(item => item.productId === product.productId);

//     if (index !== -1) {
//       // Product already in favorites — remove it
//       user.favourite.splice(index, 1);
//       await user.save();
//       return res.json({ message: "Removed from favorites", isFavorite: false });
//     }

//     // Add product to favorites
//     user.favourite.push(product);
//     await user.save();
//     res.json({ message: "Added to favorites", isFavorite: true });

//   } catch (err) {
//     console.error("Toggle favorite error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ✅ Render Favourites EJS
// router.get("/favourites", isLoggedIn, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     res.render("favourites", { favorites: user.favourite });
//   } catch (err) {
//     console.error("Render favourites page error:", err);
//     res.status(500).send("Unable to load favourites page");
//   }
// });

// module.exports = router;
