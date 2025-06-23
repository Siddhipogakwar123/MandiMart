const mongoose=require('mongoose');

const productSchema = mongoose.Schema({
    product_name : String,
    image: String,
    price : Number,
    discount:{
        type:Number,
        default:0
    },
    product_id : String
});

module.exports=mongoose.model("product",productSchema);