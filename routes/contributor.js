const express = require('express')
const moongoose = require('mongoose')
const contributors = require('../models/contributors')
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var data = { text: " " }
var f = 0;
var message={ text: " " }
router.get('/', (req, res) => {
    res.render('signup3.ejs',{data:req.query.msg})
})

router.post('/signup', urlencodedParser, (req, res) => {
    console.log(req.body)
    contributors.findOne({ username: req.body.username })
        .then((contributor) => {
            if (contributor === null) {
                if (req.body.password1 === req.body.password2) {
                    contributors.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        qualification:req.body.qualification,
                        username: req.body.username,
                        password1: req.body.password1,
                        password2: req.body.password2
                    })
                     
                    res.redirect('/contributor?msg=Successful');
                }
                else {
                    res.redirect('/contributor?msg=UnSuccessful');

                }
            }
            else {

                res.redirect('/contributor?msg=UnSuccessful');
            }
        })

})

router.post('/login', urlencodedParser,(req,res)=>{
    console.log(req.body)
    contributors.findOne({ username: req.body.username })
    .then((contributor)=>{
        if(contributor)
        {
            if(contributor.password1===req.body.password)
            {   
                res.redirect('/contridash?username='+req.body.username);
            }
            else
            {
                 
                 res.redirect('/contributor?msg=UnSuccessful');
                
            }
        }
        else
        {
            res.redirect('/contributor?msg=UnSuccessful');
                
        }
    })
})

module.exports = router;

