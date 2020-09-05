const express = require('express')
const moongoose = require('mongoose')
const contributors = require('../models/contributors')
const contridata=require('../models/contridata')
const bodyParser = require('body-parser');
const MulterGridfsStorage = require('multer-gridfs-storage');
const router = express.Router();

router.use(bodyParser.json());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//for contributor initial profile dashboard
router.get('/',(req,res)=>{
    res.render('contridash',{data:req.query.username}) 
})

//for initial get request of schedule dashboard
router.get('/schedule',(req,res)=>{
    // contributors.findOne({username:req.query.username})
    // .then((contributor)=>{
    //     console.log(contributor)
        res.render('contrischedule',{data:req.query.username,msg:req.query.msg})
    // })  
})

//for classes scheduled for further
router.get('/scheduledclasses',(req,res)=>{
    contridata.find({username1:req.query.username})
    .then((classes)=>{
        classes.forEach((a)=>{
            console.log(a.classtopic)
        })
        res.render('contriclassscheduled',{data:req.query.username,contridata:classes})
     })  
})

//for displaying the classes done
router.get('/contriclassesdone',(req,res)=>{
    contridata.find({status:req.query.status})
    .then((contributor)=>{
        res.render('contriclassesdone',{data:req.query.username,contridata:contributor})
    })
})
module.exports = router;

