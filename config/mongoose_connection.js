const mongoose=require('mongoose');
const dbgr=require("debug")("development:mongoose");  //doing this to avoid using console.log
const config = require('config'); //looks for config file development file...

mongoose
.connect(`${config.get("MONGODB_URI")}/mandi_mart`)     //when there is development it takes value from there

.then(function(){           //if connected 
    dbgr("connected");    //to avoid console.log
    console.log("connected");
})

.catch(function(err){       //if not connected
    dbgr(err);
    console.log(err);
})


mongoose.exports=mongoose.connection;  //to export