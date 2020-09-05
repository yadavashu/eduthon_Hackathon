const express = require('express')
const moongoose = require('mongoose')
const students = require('../models/students')
const contridata=require('../models/contridata')
const studentdata=require('../models/studentdata')
const bodyParser = require('body-parser');
const MulterGridfsStorage = require('multer-gridfs-storage');
const router = express.Router();

router.use(bodyParser.json());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/address',urlencodedParser,(req,res)=>{
    students.find({username:req.query.username})
    .then((student)=>{
        console.log(student)
        student[0].update({address:req.body.address})
        .then((address)=>{
            res.redirect('/cart?username='+req.query.username+'&msg1=deliver to  '+req.body.address)
        })
    })
})

router.post('/exist',urlencodedParser,(req,res)=>{
    students.find({username:req.query.username})
    .then((student)=>{
        if(student[0].address===null)
        {
            res.redirect('/cart?username='+req.query.username+'&msg2=No saved Address')
        }
        else{
            res.redirect('/cart?username='+req.query.username+'&msg1=deliver to  '+student[0].address)
        }
    })
})

router.post('/mail',urlencodedParser,(req,res)=>{
    students.find({username:req.query.username})
    .then((student)=>{
        student[0].update({email1:req.body.email})
        .then((address)=>{
            console.log(address)
            res.redirect('/cart?username='+req.query.username)
        })
    })
})

router.post('/existmail',urlencodedParser,(req,res)=>{
    students.find({username:req.query.username})
    .then((student)=>{
        student[0].update({email1:student[0].email})
        .then((address)=>{
            res.redirect('/cart?username='+req.query.username)
        })
    })
})



module.exports = router;

