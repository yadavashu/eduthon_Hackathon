const express = require('express')
const moongoose = require('mongoose')
const contributors = require('../models/contributors')
const bodyParser = require('body-parser');
const MulterGridfsStorage = require('multer-gridfs-storage');
const router = express.Router();
const contridata=require('../models/contridata')

router.use(bodyParser.json());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//for submitting details of a class
router.post('/submit',urlencodedParser,(req,res)=>{
    console.log(req.body)
    contridata.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
       username1:req.body.username1,
        classTopic:req.body.classtopic,
        subject:req.body.subject,
        mode:req.body.mode,
        date:req.body.date,
        time:req.body.time,
        placeofconduct:req.body.placeofconduct,
        capacity:req.body.capacity

    })
    .then(()=>{
        res.redirect("/contridash/schedule/?msg=your class has been scheduled &username="+req.body.username1)
    })
    
})

module.exports = router;

