const express = require('express')
const moongoose = require('mongoose')
const contributors = require('../models/contributors')
const contridata=require('../models/contridata')
const bodyParser = require('body-parser');
const MulterGridfsStorage = require('multer-gridfs-storage');
const studentdata=require('../models/studentdata')
const router = express.Router();

router.use(bodyParser.json());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/submit/:id',urlencodedParser,(req,res)=>{
    console.log(req.body)
    if(req.body.status==="done"){
    studentdata.findByIdAndUpdate({_id:req.params.id}, req.body) 
    .then((data)=>{
        res.redirect('/studentdash/attendClasses?status=decided&username='+data.username1)
    })
}
else
{    var idd; 
    contridata.find({_id:req.query.teacherID})
    .then((name)=>{
        console.log(name)
        console.log(name[0].studentRegistered)
        const id=name[0].studentRegistered.find((name)=>{
           console.log("enter");console.log(name);console.log(req.query.username);if(name.username===req.query.username){console.log("hello");idd=name._id;return name._id}
        })
        console.log(idd)
        name[0].studentRegistered.pull({_id:idd})
        name[0].save();
        console.log(req.params.id)
        studentdata.findByIdAndDelete({_id:req.params.id})
        .then(()=>{
            res.redirect('/studentdash/attendClasses?username='+req.query.username)
        })
       
    })
    // studentdata.findByIdAndDelete(req.params.id)
    // res.redirect('/studentdash/attendClasses?status=decided&username='+req.query.username)
    
}
})



module.exports = router;

