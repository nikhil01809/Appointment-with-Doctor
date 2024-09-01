import mongoose from "mongoose";

const connectDB =async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Mongodb connected ${mongoose.connection.host}`);
    }
    catch(error){
        console.log(`Mongodb server issue ${error}`)
    }
}
export default connectDB;
