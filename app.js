const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const cors=require("cors");
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(cookieParser());

const userrouter = require("./routes/userroutes");
const bookrouter = require("./routes/bookroutes");

app.use(bodyparser.json())


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

mongoose.connect(`${process.env.DB_url}`,{    
})
.then(console.log("database connection success!!!"))
.catch((err)=>{console.log(err)});


app.use("/register", userrouter);
app.use("/register", userrouter);
app.use("/", userrouter);

app.use("/book", bookrouter);

app.listen(process.env.PORT, ()=>{
    console.log(`server running on PORT : ${process.env.PORT}`)
})
