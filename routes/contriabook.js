const express = require('express')
const moongoose = require('mongoose')
const books= require('../models/books.js')
const bodyParser = require('body-parser');
var multer=require('multer')
var path=require('path')
const router = express.Router();


var Storage=multer.diskStorage({
    destination:"./public/uploads",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
});
var upload=multer({
 storage:Storage
}).single('file')

router.use(bodyParser.json());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/upload',upload,urlencodedParser,(req,res)=>{
    var Imagename=req.file.filename
    books.create({
        username:req.query.username,
        email:req.body.email,
        BookTitle:req.body.BookTitle,
        subject:req.body.subject,
        stock:req.body.stock,
        image:Imagename,
    })
    .then(()=>{
        res.redirect('/booksite/contribook?username='+req.query.username+"&msg=Your book has been added")
    })
})

module.exports = router;











