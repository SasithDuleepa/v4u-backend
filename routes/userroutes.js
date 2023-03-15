const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const Newuser = require("../models/usermodel");



const router = express.Router();

router.use(bodyParser.json());


router.post("/", async(req,res)=>{
    var newuser = new Newuser({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        user:req.body.user
    });

    const saveuser =  newuser.save()
    .then((req)=>{res.send(newuser)})
    .catch((err)=>{res.send(err)})
    console.log(newuser);
})

router.post('/login', async(req,res)=>{
    const useremail= req.body.email
  
    

    var find_mail = await Newuser.findOne({email:useremail})
    .then((find_mail)=>{
        console.log(find_mail)
        if(find_mail.password === req.body.password){
            const user = {name: "user",
                          userid:find_mail._id,
                          name:find_mail.first_name +" "+find_mail.last_name};
            const Token = jwt.sign(user, process.env.SECRET_KEY,{expiresIn:'24h'});
             res.cookie('myCookie', Token, { maxAge: 36000000 , domain:"localhost:8080", path:"/" });
          
            
            
            
            
            res.send(Token);
          
            
        }else{
            res.sendStatus(404)
           
        };
    })
    .catch((err)=>{
         res.sendStatus(401)
        
       

        });
})
router.get("/user",async(req,res)=>{
   
    
    const cookieValue = req.cookies.myCookie;
    if(cookieValue){
        const jsonObject= JSON.parse(cookieValue);
        const tokenvalue = jsonObject.token;

        jwt.verify(`${tokenvalue}`, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
              console.log(err);
            } else {
              console.log(decoded);
              res.send(decoded.name);
             
            }
          });

    }
    
    

    // const decoded_token = jwt.decode(`${tokenvalue}`, "this is my secret key", algorithms=["HS256"])
    // console.log(decoded_token)

     
    
})

module.exports = router;