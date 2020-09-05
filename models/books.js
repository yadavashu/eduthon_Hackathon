const mongoose=require('mongoose')
const Scheme=mongoose.Schema;

const orderSchema=new mongoose.Schema({
    username1:{
        type:String
    },
    bookID:{
        type:String
    }
})


const bookSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
   
    email:{
        type:String,
        required:true
     },
    BookTitle:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    StudentOrdered:[orderSchema]
    
})

var booksdata=mongoose.model('bookdata',bookSchema)
module.exports=booksdata;