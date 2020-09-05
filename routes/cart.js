const express = require('express')
const moongoose = require('mongoose')
const books= require('../models/books.js')
const bodyParser = require('body-parser');
const bookcart=require('../models/cart.js')
var multer=require('multer')
var path=require('path');
const cartsdata = require('../models/cart.js');
const bookorders=require('../models/bookordered');
const { Console } = require('console');
const router = express.Router();

router.use(bodyParser.json());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',(req,res)=>{

    bookcart.find({username:req.query.username})
    .then((books)=>{
        if(books.length>0)
        res.render('bookcart',{books:books,data:req.query.username,msg:req.query.msg,msg1:req.query.msg1,msg2:req.query.msg2,msg3:"Well enough, You have a good lot!"})
        else
        {   
            res.render('bookcart',{books:books,data:req.query.username,msg:req.query.msg,msg1:req.query.msg1,msg2:req.query.msg2,msg3:"Your cart is empty"})
        }
    })
})

router.post('/added',urlencodedParser,(req,res)=>{
    console.log(req.query.username)
    console.log(req.query.bookID)
    console.log(req.query.stock)
    if(req.query.stock>0)
    {
        bookcart.create({
            username:req.query.username,
            bookID:req.query.bookID,
            image:req.query.image,
            subject:req.query.subject,
            bookTopic:req.query.topic
        })
        .then(()=>{
            res.redirect('/booksite?bookID='+req.query.bookID+'&username='+req.query.username+'&msg=Added to cart successfully')
        })
    }
    else
    {   
        res.redirect('/booksite?bookID='+req.query.bookID+'&username='+req.query.username+'&msg1=Out of Stock')
    }
})


//placing an order
router.get('/order',(req,res)=>{
    bookcart.find({username:req.query.username})
    .then((bookes)=>{
        bookorders.find({username:req.query.username})
        .then((name)=>{
            console.log(name.length)
              if(name.length>0)
              {
                  console.log("jh")
                bookes.forEach((book)=>{
                    name[0].orders.push(book.bookID)
                    name[0].save();
                    console.log(book.bookID)
                    books.findById({_id:book.bookID})
                    .then((beek)=>{
                        console.log("sdfgh")
                        var st=beek.stock-1;
                        beek.update({stock:st})
                        .then((success)=>{
                        console.log('success')
            
                        })
                    })
              })
            
              }
              else{
                  bookorders.create({username:req.query.username})
                  .then((tt)=>{
                      console.log(tt.orders)
                     
                    console.log(tt)
                      console.log("hurray")
                      console.log(bookes)
                      bookes.forEach((book)=>{
                        console.log(book.bookID)
                        console.log(tt)
                        tt.orders.push(book.bookID)
                        tt.save();
                        books.findById({_id:book.bookID})
                        .then((beek)=>{
                            console.log("sdfgh")
                            var st=beek.stock-1;
                            beek.update({stock:st})
                            .then((success)=>{
                                console.log('success')
                
                            })
                        })
                  })
                
                  })
                  console.log("pe")
              }
              
     
      })
    })
    res.redirect('/cart?username='+req.query.username+'&msg=Your order has been successfully placed with delivery fees of 50rs further details will be emailed')
})

//deleting the cart
router.get('/delete',(req,res)=>{
    cartsdata.deleteMany({username:req.query.username})
    .then((data)=>{
       
   
        // cartsdata.data.pull({username:req.query.username})
        res.redirect('/cart?username='+req.query.username)
    })
})
module.exports = router;











