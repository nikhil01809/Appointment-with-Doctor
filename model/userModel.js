import mongoose from "mongoose";
const userModel=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
    },
    email:{
        type:String,
        required:[true,'email is required'],
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    notification:{
        type:Array,
        default:[]
    },
    seennotification:{
        type:Array,
        default:[]
    },
    profileImage:{
        type:String,
        default:""
    }
})
export default mongoose.model('users',userModel);