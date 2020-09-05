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


router.post('/submit/:id', urlencodedParser,(req,res)=>{
    console.log(req.body)
    if(req.body.status==="done"){
    contridata.findByIdAndUpdate({_id:req.params.id}, req.body) 
    .then((data)=>{
        res.redirect('/contridash/scheduledclasses?status=decided&username='+data.username1)
    })
}
else{
    contridata.findByIdAndDelete({_id:req.params.id}) 
    .then((data)=>{
        res.redirect('/contridash/scheduledclasses?status=decided&username='+req.query.username)
    })
}
})



module.exports = router;

