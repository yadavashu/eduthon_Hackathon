const express=require("express")
const http=require("http")
const mongoose=require('mongoose')
const Students=require('./models/students')
const Contributors=require('./models/contributors')

//for main website and sign up and login
const mainRouter=require('./routes/main')
const signRouter=require('./routes/student')
const contrisignRouter=require('./routes/contributor')
const contridashRouter=require('./routes/contridash')
const contrischeduleRouter=require('./routes/contrischedule')
const contrischeduledRouter=require('./routes/scheduled')
const studentdashRouter=require('./routes/studentdash')
const studenteacherRouter=require('./routes/studenteacher')
const studentscheduledclassesRouter=require('./routes/scheduledclasses')
const booksiteRouter=require('./routes/booksite')
const contriabookRouter=require('./routes/contriabook')
const cartRouter=require('./routes/cart')
const relatedRouter=require('./routes/addressrelated')
const orderhistoryRouter=require('./routes/orderhistory')

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
app.use('/contridash',contridashRouter)
app.use('/schedule',contrischeduleRouter)
app.use('/scheduled',contrischeduledRouter)
app.use('/studentdash',studentdashRouter)
app.use('/studenteacher',studenteacherRouter)
app.use('/scheduledclasses',studentscheduledclassesRouter)
app.use('/booksite',booksiteRouter)
app.use('/contriabook',contriabookRouter)
app.use('/cart',cartRouter)
app.use('/related',relatedRouter)
app.use('/orderhistory',orderhistoryRouter)
app.use('/',mainRouter)


app.set('view engine', 'ejs');


const server=http.createServer(app);
server.listen(port,portname,()=>{
    console.log("connected to server")
})