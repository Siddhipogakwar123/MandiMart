const mongoose=require('mongoose');

const productSchema= new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  description:String,

  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
  },
  image: {
    type: String,
    default: "/images/default.jpg", // update as needed
  },

  purchaseBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});


module.exports=mongoose.model("product",productSchema);