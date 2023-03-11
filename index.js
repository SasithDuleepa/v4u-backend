const { response } = require('express');
const express = require('express')
const app = express()
const app1 = express()
const fetch = require('node-fetch');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const port = 3001
const port1 = 3005

var book_id1= 1
var book_id2= 2
var book_id3= 10
var book_id4= 37
var book_id5= 45
var book_id6= 36
var book_id7= 35
var book_id8

var data ={
    title1:"Loading..",
    title2:"Loading..",
    title3:"Loading..",
    title4:"Loading..",
    title5:"Loading..",
    title6:"Loading..",
    title7:"Loading..",
    title8:"Loading.."
}

var object='';

//get data from python api
app.get('/api/users', function(req, res) {
  fetch('http://127.0.0.1:8000/')
    .then(response => response.json())
    .then(data  => {
      book_id1 =  data.message[0]
      book_id2 = data.message[1]
      book_id3 = data.message[2]
      book_id4 = data.message[3]
      book_id5 = data.message[4]
      book_id6 = data.message[5]
      book_id7 = data.message[6]
      book_id8 = data.message[7]
      console.log(data.message[1]); })
    
    .catch(error => console.error(error));
    
});

//for user history db update
app1.use(express.json());

app1.post('/server/route', (req, res) => {
  const data = req.body;
  console.log(data)
  if(data.name !== '' && data.name !=='Loading..'){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("v4u");
    var myobj = { title: data.title };
    dbo.collection("history").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  }
  
});
app1.listen(port1, ()=> {
    console.log(`listening server1 on port ${port1}`)
})

//for recommendation
app.get('/', async(req,res) =>{

  fetch('http://127.0.0.1:8000/')
    .then(response => response.json())
    .then(data  => {
      book_id1 =  data.message[0]
      book_id2 = data.message[1]
      book_id3 = data.message[2]
      book_id4 = data.message[3]
      book_id5 = data.message[4]
      book_id6 = data.message[5]
      book_id7 = data.message[6]
      book_id8 = data.message[7]
      console.log(data.message); })
    
    .catch(error => console.error(error));

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("v4u");
        var query = { bookID: "2" };
        dbo.collection("books").find({ bookID: book_id1 }).toArray(function(err, result) {
          if (err) throw err;
          data.title1= result;
          //console.log(result);
          
        });

        dbo.collection("books").find({ bookID: book_id2 }).toArray(function(err, result) {
          if (err) throw err;
          data.title2= result;
          //console.log(result);
          
          
        });

        dbo.collection("books").find({ bookID: book_id3 }).toArray(function(err, result) {
          if (err) throw err;
          data.title3= result;
          //console.log(result);
          
          
        });

        dbo.collection("books").find({ bookID:book_id4 }).toArray(function(err, result) {
          if (err) throw err;
          data.title4= result;
          //console.log(result);
          
          
        });

        dbo.collection("books").find({ bookID: book_id5 }).toArray(function(err, result) {
          if (err) throw err;
          data.title5= result;
          //console.log(result);
          
          
        });

        dbo.collection("books").find({ bookID: book_id6 }).toArray(function(err, result) {
          if (err) throw err;
          data.title6= result;
          //console.log(result);
          
          
        });

        dbo.collection("books").find({ bookID: book_id7 }).toArray(function(err, result) {
          if (err) throw err;
          data.title7= result;
          //console.log(result);
          
          
        });

        
        
      });

    
    res.send(data)
})

//new books
var new_books={}
app.get('/newbook',(req,res)=>{
  
 
  MongoClient.connect(url, function(err,db){
    if (err) throw err;
    var dbo = db.db("v4u");
    

    dbo.collection('books') .find({}) .limit(7) .sort({$natural:-1}) .toArray(function(err, collection){
      if (err) throw err;
      
      new_books = collection;
      //console.log(collection);
    });
    
  })
  
  res.send(new_books)
})


//editors choice

var random={}
app.get('/editor_choice',(req,res)=>{
  
 
  MongoClient.connect(url, function(err,db){
    if (err) throw err;
    var dbo = db.db("v4u");
    let x = Math.random()*1000;

    
    

    dbo.collection('books') .find({}) .limit(7) .skip(1) .toArray(function(err, collection){
      if (err) throw err;
      
      random = collection;
      //console.log(collection);
      
    });
    
    
  })
  
  res.send(random)
})




app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})