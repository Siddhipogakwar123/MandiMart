const express = require('express');
const router = express.Router();
router.get('/product_details', (req, res) => {
  res.render('product_details'); 
});
module.exports = router;
