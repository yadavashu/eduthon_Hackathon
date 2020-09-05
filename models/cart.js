const mongoose=require('mongoose')
const Scheme=mongoose.Schema;


const cartSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    bookID:{
        type:String
    },
    image:{
        type:String
    },
    subject:{
        type:String
    },
    bookTopic:{
        type:String
    }

    
})

var cartsdata=mongoose.model('cartdata',cartSchema)
module.exports=cartsdata;