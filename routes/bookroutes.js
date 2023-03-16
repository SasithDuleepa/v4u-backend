const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const Book = require("../models/bookmodel");

const router = express.Router();

router.use(bodyParser.json());

router.post("/save", async(req,res)=>{
    const cookieValue = req.cookies.myCookie;
    const jsonObject= JSON.parse(cookieValue);
    const tokenvalue = jsonObject.token;
    
    jwt.verify(`${tokenvalue}`, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          console.log(err);
        } else {
          console.log(decoded.userid);
          var newbook =new Book({
            user_id:decoded.userid,
        
            book_name: req.body.book_name,
            
            author:req.body.author,
            catergory:req.body.catergory,
            description:req.body.description,
            pages:req.body.pages
    
        });
        const savebook = newbook.save()
        .then(()=>{res.send(newbook)})
        .catch((err)=>{res.send(err)})
          
         
        }
      });

    
   
    





    
})

module.exports = router;