const mongoose=require('mongoose')
const Scheme=mongoose.Schema;



const infoSchema=new mongoose.Schema({
    firstname:{
        type:String
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    stustatus:{
        type:String,
        default:null

    }
})
const contridataSchema=new mongoose.Schema({
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
    capacity:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:null
    },
    studentRegistered:[infoSchema]
})

var contributorsdata=mongoose.model('contributordata',contridataSchema)
module.exports=contributorsdata;