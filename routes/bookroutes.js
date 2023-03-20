const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const multer = require('multer');
 
const path = require('path');

const File = require("../models/bookmodel");
const upload = require("../middleware/file")

const router = express.Router();

router.use(bodyParser.json());

router.post("/save", upload.single('file'),async(req,res)=>{
    const cookieValue = req.cookies.myCookie;
    
    const jsonObject= JSON.parse(cookieValue);
    
    const tokenvalue = jsonObject.token;
    console.log(tokenvalue)
    
    
    jwt.verify(`${tokenvalue}`, process.env.SECRET_KEY, async(err, decoded) => {
      if(err){console.log(err)}
      else{
        const { filename, path, size } = req.file;
            const file = new File({
              filename,
              path,
              size,
              user_id: decoded.userid,
              book_name:req.body.name,
              author:req.body.author,
              catergory:req.body.catergory,
              description: req.body.description,
              pages:req.body.page
              
            });
            await file.save();
            const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
            res.send({ url: fileUrl });

         




       
          
        
          }
       
          
         
        
      });

    
   
    





    
})

router.get('/download/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join('D:/V4U/BACK-END', 'uploads', fileName);
  console.log(filePath)

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
});  


// new books
router.get("/newbooks", async(req,res)=>{
  const newBooks =await File.find().sort({ _id: -1 }).limit(8)
  .then((newBooks)=>{res.send(newBooks)})
  .catch((err)=>{console.log(err)})
})
module.exports = router;