const mongoose=require('mongoose');

const userSchema = mongoose.Schema({
    fullname : String,
    email : String,
    password : String, 
    userid: String,
    orders : Number,
    contact : Number,
    cart : {
        type:Array,
        default:[]
    },
    purchased:{
        type:Array,
        default:[]
    },
    sell:{
        type:Array,
        default:[]
    },
    favourite:{
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
