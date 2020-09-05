const express = require('express')
const moongoose = require('mongoose')
const contributors = require('../models/contributors')
const contridata=require('../models/contridata')
const studentdata=require('../models/studentdata')
const bodyParser = require('body-parser');
const MulterGridfsStorage = require('multer-gridfs-storage');
const router = express.Router();

router.use(bodyParser.json());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//for student initial profile dashboard
router.get('/',(req,res)=>{
    res.render('studentdash',{data:req.query.username}) 
})



//for students searching teachers
router.get('/teacher',(req,res)=>{
    // if(req.query.msg===null && req.query.subject===null)
    // {
    //     res.render('studentteacher',{data:req.query.username,message:req.query.message})
    // }
    // else if(req.query.msg===null)
    // {
    //     contridata.find({subject:req.query.subject})
    //     .then((teacher)=>{
    //         res.render('studentteacher',{data:req.query.username,teacher:teacher,message:req.query.message})
    //     })
    // }
    // else{
    //     res.render('studentteacher',{data:req.query.username,msg:req.query.msg,message:req.query.message})
    // }

    contridata.find({subject:req.query.subject})
    .then((teacher)=>{
        res.render('studentteacher',{data:req.query.username,message:req.query.message,teachers:teacher,msg:req.query.msg,msg1:req.query.msg1,msg2:req.query.msg2})
    })

})


//further classes that student has to attend
router.get('/attendCLasses',(req,res)=>{
    studentdata.find({username1:req.query.username})
    .then((classes)=>{
        console.log("jello")
        res.render('studentclass',{classes:classes,data:req.query.username})
    })
})


//classes done 
router.get('/classesdone',(req,res)=>{
    studentdata.find({username1:req.query.username,status:'done'})
    .then((classes)=>{
        res.render('studentclassdone',{data:req.query.username,classes:classes})
    })
}) 
module.exports = router;

