const mongoose=require('mongoose')
const Scheme=mongoose.Schema;

const studentSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password1:{
        type:String,
        required:true
    },
    password2:{
        type:String,
        required:true
    }

})

var contributors=mongoose.model('contributor',studentSchema)
module.exports=contributors;