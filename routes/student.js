const express = require('express')
const mongoose = require('mongoose')
const students = require('../models/students')
const bodyParser = require('body-parser');
const router = express.Router();

const path=require('path')
const crypto=require('crypto')
const multer=require('multer')
const GridFsStorage=require('multer-gridfs-storage')
const Grid=require('gridfs-stream')
const methodOverride=require('method-override')

router.use(bodyParser.json());
router.use(methodOverride('_method'))

const url='mongodb://localhost:27017/users'
let gfs
var conn = mongoose.createConnection(url);
conn.once('open', function () {
   gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads')
  // all set!
})

const storage = new GridFsStorage({
    url:url,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

// post upload
router.post('/upload',upload.single('file'),(req,res)=>{
   console.log(req.file)
    res.redirect('/student?uploadid='+req.file.id+'&originalname='+req.file.originalname);
})

router.get('/delete/:id',(req,res)=>{

  console.log(req.params.id)
  gfs.remove({ _id: req.params.id })
  .then((name)=>{
    res.redirect('/student')
  })
})





//not with photo




var f = 0;
var message={ text: " " }
router.get('/', (req, res) => {
    res.render('signup1.ejs',{data:req.query.msg,image:req.query.originalname,id:req.query.uploadid});
    
})

router.post('/signup', urlencodedParser, (req, res) => {

    students.findOne({ username: req.body.username })
        .then((student) => {
            if (student === null) {
                if (req.body.password1 === req.body.password2) {
                    students.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        username: req.body.username,
                        password1: req.body.password1,
                        password2: req.body.password2
                    })
                     
                    res.redirect('/student?msg=Successful');

                }
                else {
                     
                        res.redirect("/student?msg=UnSuccessful");
                }
            }
            else {

                
                 res.redirect("/student?msg=UnSuccessful");
            }
        })

})


router.post('/login', urlencodedParser,(req,res)=>{
   
    students.findOne({ username: req.body.username })
    .then((student)=>{
        if(student)
        {
            if(student.password1===req.body.password)
            {   
                res.redirect('/studentdash?username='+req.body.username)
            }
            else
            {
                 data={text:"Invalid passowrd!"}
                 res.render('signup1', {data:data})
                
            }
        }
        else
        {
           data={text:"Username does not exist!"}
            res.render('signup1', { data:data})
                
        }
    })
})

module.exports = router;

