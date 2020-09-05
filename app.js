const express=require("express")
const http=require("http")
const mongoose=require('mongoose')
const Students=require('./models/students')
const Contributors=require('./models/contributors')

//for main website and sign up and login
const mainRouter=require('./routes/main')
const signRouter=require('./routes/student')
const contrisignRouter=require('./routes/contributor')

const portname='localhost'
const port=3000

const url='mongodb://localhost:27017/school'

const connect=mongoose.connect(url)
.then(()=>{
    console.log("connected to server succeessfully")
})
.catch((err)=>{
    console.log("Error")
})

const app=express();
app.use(express.static(__dirname + '/public'))
app.use('/student',signRouter)
app.use('/contributor',contrisignRouter)
app.use('/',mainRouter)


app.set('view engine', 'ejs');


const server=http.createServer(app);
server.listen(port,portname,()=>{
    console.log("connected to server")
})