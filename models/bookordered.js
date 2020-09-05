const books=require('./books')
const mongoose=require('mongoose')
const Scheme=mongoose.Schema;




const bookorderSchema=new mongoose.Schema({
    username:{
        type:String,
        default:null
    },
   orders:[{idd:{
    type: String
   }
   }]

})

var bookordersdata=mongoose.model('bookorder',bookorderSchema)
module.exports=bookordersdata;