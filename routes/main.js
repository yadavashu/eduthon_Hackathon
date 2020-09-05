const express=require('express')
const moongoose=require('mongoose')

const bodyParser=require('body-parser');
const router=express.Router();

router.use(bodyParser.json());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/',(req,res)=>{
    res.statuscode=200
    res.render('index.ejs')
})



module.exports=router;

