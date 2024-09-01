import mongoose from "mongoose";

const doctorModel=new mongoose.Schema({
    userId:{
        type:String
    },
    firstname:{
        type:String,
        required:[true,'firstname is required']
    },
    lastname:{
        type:String,
        required:[true,'lastname is required']
    },
    phone:{
        type:String,
        required:[true,'Phone no is required']
    },
    website:{
        type:String
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    address:{
        type:String,
        required:[true,'address is required']
    },
    specialization:{
        type:String,
        required:[true,'specialization is required']
    },
    feesPerCunsalation:{
        type:Number,
        required:[true,'fees is required']
    },
    status:{
        type:String,
        default:"pending"
    },
    experience:{
        type:String,
        required:[true,'experience is required']
    },
    timing:{
        type:Object,
        required:[true,'work timing is required']
    },
    profileImage:{
        type:String,
        default:""
    }
},
{timestamps:true})
export default mongoose.model('Doctor',doctorModel)