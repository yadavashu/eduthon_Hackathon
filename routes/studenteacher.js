const express = require('express')
const moongoose = require('mongoose')
const contributors = require('../models/contributors')
const contridata=require('../models/contridata')
const studentdata=require('../models/studentdata')
const bodyParser = require('body-parser');
const MulterGridfsStorage = require('multer-gridfs-storage');
const studentsdata = require('../models/studentdata')
const router = express.Router();

router.use(bodyParser.json());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//for handling searching routes of students searching teachers
router.post('/',urlencodedParser,(req,res)=>{
    console.log(req.body)
    contridata.find({subject:req.body.search})
    .then((teacher)=>{
        if(teacher.length>0)
        {   
            console.log(teacher)
            res.redirect('studentdash/teacher?username='+req.query.username+'&subject='+req.body.search)
        }
        else
        {
            
            res.redirect('studentdash/teacher?username='+req.query.username+'&msg=No teachers found')
        }
    })
})
router.post('/submit/:id',urlencodedParser,(req,res)=>{
    console.log(req.body)
    console.log(req.params.id)
    console.log(req.query.username)
    contridata.find({_id:req.params.id})
    .then((teacher)=>{
        console.log(teacher)
        console.log(teacher[0].studentRegistered)
               var f= teacher[0].studentRegistered.find((name)=>{
                    if(name.username===req.query.username){console.log("hello");
                    return true;}
                })
              

                
               if(f)
               {
                   res.redirect('/studentdash/teacher?username='+req.query.username+'&subject='+req.query.subject+'&msg1=Already booked')
               }
               else
               {    
                   teacher[0].studentRegistered.push({
                       firstname:req.body.firstname,
                       username:req.body.username,
                       email:req.body.email,
                       stustatus:'none'
                   })
                   teacher[0].save();
                studentdata.create({
                    firstname:teacher[0].firstname,
                    lastname:teacher[0].lastname,
                    
                    username1:req.query.username,
                    classTopic:teacher[0].classTopic,
                    subject:teacher[0].subject,
                    mode:teacher[0].mode,
                    date:teacher[0].date,
                    time:teacher[0].time,
                    placeofconduct:teacher[0].placeofconduct,
                    teacherID:teacher[0]._id
                })

                   res.redirect('/studentdash/teacher?username='+req.query.username+'&subject='+req.query.subject+'&msg2=Class booked') 
               }
         

})
})
module.exports = router;

