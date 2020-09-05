const mongoose=require('mongoose')
const Scheme=mongoose.Schema;


const studentdataSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    
    username1:{
        type:String
       
    },
    classTopic:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    mode:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    placeofconduct:{
        type:String,
        required:true
    },
    
    status:{
        type:String,
        default:null
    },
    teacherID:{
        type:String
    }
})

var studentsdata=mongoose.model('studentdata',studentdataSchema)
module.exports=studentsdata;