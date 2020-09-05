const express = require('express')
const moongoose = require('mongoose')
const books= require('../models/books.js')
const bodyParser = require('body-parser');
var multer=require('multer')
var path=require('path')
const router = express.Router();

router.use(bodyParser.json());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',(req,res)=>{
    books.find({})
    .then((name)=>{
        console.log(name[0].image)
        res.render('booksite.ejs',{data:req.query.username,name:name,msg1:req.query.msg1,msg:req.query.msg,bookID:req.query.bookID})
    })
})
router.get('/contribook',(req,res)=>{
    res.render('contriabook.ejs',{data:req.query.username,msg:req.query.msg})
})

module.exports = router;











