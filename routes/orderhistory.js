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


router.get('/',async (req,res)=>{
    const see=[]
    var pis=[]
    const orders=await books.find({ })
    
    pis=orders
    console.log(pis)
    const fis=[];
    const ordersdone=await bookorders.find({username:req.query.username})
    console.log(ordersdone)
    const fuse=[];
    ordersdone[0].orders.forEach((order)=>{
       
        for(var i=0;i<orders.length;i++)
        {   
            var a=orders[i]._id
            var b=order._id
           
           
           
            if(orders[i]._id.equals(order._id))
            {   console.log("equal")
                    var obj={
                        BookTitle:orders[i].BookTitle,
                        subject:orders[i].subject,
                        image:orders[i].image
                    }
                   
                    fuse.push(obj);
                   
            }
           
        }
    })
    console.log(fuse)
    var obj={fuse}
    console.log(obj);
    res.render('orderhistory',{data:req.query.username,name:obj})

   

    // async function foo(){
    //      pis[0].orders.forEach(async (order)=>{
    //         console.log(order._id)
    //      await books.find({_id:order.id})
    //       .then((book)=>{
    //         console.log(book)
    //         var obj={BookTitle:book[0].BookTitle,
    //                 subject:book[0].subject,
    //                 image:book[0].image};
    //                 console.log("hello")
    //         see.push(obj)
    //         console.log(see[0])
      
    //     })   
    //     })
    //     console.log("asdfasdf")
    //     see.forEach((obj)=>{
    //         console.log(obj)
    //     })
    // }
       
    //    foo();
    
    // .then((book)=>{
    //             console.log(book)
                // var obj={BookTitle:book[0].BookTitle,
                //         subject:book[0].subject,
                //         image:book[0].image};
                //         console.log("hello")
                // see.push(obj)
                // console.log(see[0])
          
            // })   
           
        
  

    // .then((orders)=>{
    //     console.log(orders)
    // })
     

    // .then((orders)=>{
       
    //     orders[0].orders.forEach((order)=>{
    //         console.log(order._id)
    //       const book=books.find({_id:order.id})
    //       return book
    //     })
    // })
    // .then((book)=>{
    //             console.log(book)
    //             // var obj={BookTitle:book[0].BookTitle,
    //             //         subject:book[0].subject,
    //             //         image:book[0].image};
    //             //         console.log("hello")
    //             // see.push(obj)
    //             // console.log(see[0])
          
    //         })
            
        
    //     console.log("jello")
    //    console.log("peelo")
    //    res.render('orderhistory',{data:req.query.username,name:see})
    
    })
    




module.exports = router;











