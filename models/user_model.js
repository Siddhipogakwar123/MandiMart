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
    picture : String
});

module.exports=mongoose.model("user",userSchema);