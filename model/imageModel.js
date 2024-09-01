import mongoose from "mongoose";
const imageModel=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        data:Buffer,
        contentType:String
    }

})
export default mongoose.model("Image",imageModel)