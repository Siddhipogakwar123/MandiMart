const express = require("express");
const router = express.Router();
const razorpay = require("../utils/razorpay");
const productModel = require("../models/product_model");
const crypto = require("crypto");

// BUY ROUTE
router.get("/buy/:productId", async (req, res) => {
  const product = await productModel.findById(req.params.productId);
  if (!product) return res.status(404).send("Product not found");

  const amount = product.price * 100; // Razorpay needs amount in paise

  const options = {
    amount: amount,
    currency: "INR",
    receipt: `receipt_order_${product._id}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.render("checkout", {
      product,
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating order");
  }
});

// VERIFY ROUTE
router.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  const generated_signature = crypto
    .createHmac("sha256", key_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    console.log("✅ Payment Verified");

    try {
      const productId = razorpay_order_id.split("_").slice(-1)[0];
      const product = await productModel.findById(productId);

      if (product && !product.isSold) {
        product.isSold = true;
        await product.save();
        console.log("✅ Product marked as sold.");
      }

      res.send("Payment Verified and Product Sold");
    } catch (err) {
      console.error("❌ Error updating product:", err);
      res.status(500).send("Payment verified but failed to update product.");
    }
  } else {
    console.log("❌ Invalid Signature");
    res.status(400).send("Invalid signature");
  }
});

// ✅ Export after all routes
module.exports = router;
