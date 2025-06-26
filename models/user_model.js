const mongoose=require('mongoose');

const userSchema = mongoose.Schema({
    fullname : String,
    email : String,
    password : String, 
    userid: String,
    cart : {
        type:Array,
        default:[]
    },
    orders : Number,
    contact : Number,
    purchased:{
        type:Array,
        default:[]
    },
    picture : String,
    emailVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpires: Date
});

module.exports=mongoose.model("user",userSchema);
