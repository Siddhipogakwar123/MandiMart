const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  product_name: String,
  image: String,
  price: Number,
  discount: {
    type: Number,
    default: 0
  },
  product_id: String,
  isSold: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("product", productSchema);
