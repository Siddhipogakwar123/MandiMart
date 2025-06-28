const express=require("express");
const router= express.Router();
const ownerModel = require('../models/owner');


router.get("/",function(req,res){
    res.send("hey");
})

router.post("/create",async function (req,res) {
    let {fullname,email,password} =req.body;
    res.send("we can create owners");
    let createdOwner=await ownerModel.create({
        fullname,
        email,
        password, 
        userid,
        contact
    });
    res.send(201).send(createdOwner);
})

module.exports =router;