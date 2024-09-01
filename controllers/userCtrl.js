 import userModel from "../model/userModel.js";
 import bcrypt from "bcryptjs";
 import jwt from "jsonwebtoken";
import doctorModel from "../model/doctorModel.js";
import appointmentModel from "../model/appointmentModel.js";
import moment from "moment"
 export const loginController= async(req,res)=>{
    try{
      const existing =await userModel.findOne({email:req.body.email});
      if(!existing){
        return res.status(200).send({message:"user not exist",success:false});
      }
      const verified=bcrypt.compareSync(req.body.password,existing.password);
      if(verified){
        const token=jwt.sign({id:existing._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        return res.status(200).send({message:"User login successfully",success:true,token});
      }
      return res.status(201).send({message:"password incorrect",success:false});
    }
    catch(error){
      console.log(error);
      return res.status(500).send({success:false,message:`somethin went wrong ${error}`});
    }
}

export const registerController = async (req, res) => {
    try {
      const exisitingUser = await userModel.findOne({ email: req.body.email });
      if (exisitingUser) {
        return res
          .status(200)
          .send({ message: "User Already Exist", success: false });
      }
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      const newUser = new userModel(req.body);
      await newUser.save();
      const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"1d"})
      res.status(201).send({ message: "Register Sucessfully", success: true ,token});
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: `Register Controller ${error.message}`,
      });
    }
  };
export const authController=async(req,res)=>{
  try{
    const user=await userModel.findOne({_id:req.body.userId});
    user.password=undefined;
    if(!user) return res.status(200).send({message:"user not found",success:false});
    else {return res.status(200).send({data:user,success:true});
  }}
  catch(error){
    return res.status(500).send({message:"auth error",success:false,error});
  }
}
// export const auth2Controller=async(req,res)=>{
//   try{
//     console.log(req.body);
//     const user=await userModel.findOne({_id:req.body.userdId});
//     user.password=undefined;
//     if(!user) return res.status(200).send({message:"user not found",success:false});
//     else {return res.status(200).send({data:user,success:true});
//   }}
//   catch(error){
//     return res.status(500).send({message:"auth error",success:false,error});
//   }
// }
export const applyDoctorController=async(req,res)=>{
  try{
    const newDoctor=await doctorModel({...req.body,status:"pending"})
    await newDoctor.save();
    const adminUser=await userModel.findOne({isAdmin:true});
    const notification=adminUser.notification;
    notification.push({
      type:"apply-doctor-request",
      message:`${newDoctor.firstname} ${newDoctor.lastname} has applied for doctor`,
      data:{
        doctorId:newDoctor._id,
        name:newDoctor.firstname+" "+newDoctor.lastname,
        onClickPath:"/admin/doctors"
      },
    })
    await userModel.findByIdAndUpdate(adminUser._id,{notification});
    return res.status(200).send({message:"doctor account applied successfully",success:true});
  }
  catch(error){
    return res.status(502).send({message:"Error while applying for doctor",success:false,error});
  }
}
export const notificationController=async(req,res)=>{
try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
   seennotification.push(...notification);
    user.notification = [];
    // user.seennotification = notification;
    const updatedUser = await user.save();
    updatedUser.password=undefined;
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
}
export const deleteAllNotification=async(req,res)=>{
  try{
    const user=await userModel.findOne({_id:req.body.userId});
    user.seennotification=[];
    const updatedUser=await user.save();
    updatedUser.password=undefined;
    res.status(200).send({message:"Notification deleted Successfully",success:true,data:updatedUser});
  }
  catch(error){
    console.log(error);
    res.status(500).send({message:"something went wrong",success:true,error});
  }
}
export const getAllDoctorsController=async(req,res)=>{
  try{
    const doctors=await doctorModel.find({});
    res.status(200).send({message:"Doctor list fetched",success:true,data:doctors});
  }
  catch(error){
    res.status(500).send({message:"Error while Fetching doctors list",success:true,error});
  }
}
export const bookAppointmentController=async(req,res)=>{
  try{
    // console.log(req.body.date);
    req.body.date=moment(req.body.date,"DD-MM-YYYY").toISOString();
    req.body.time=moment(req.body.time,"HH:mm").toISOString();
    req.body.status="pending"
    const newAppointment=await appointmentModel(req.body);
    await newAppointment.save();
    
    const user=await userModel.findOne({_id:req.body.doctorInfo.userId});
    const notification=user.notification;
    notification.push({
      type:"appointment book",
      message:`A new appointment request from ${req.body.userInfo.name}`,
      onClickPath:"/user/appointments"
    })
    await user.save();
    res.status(200).send({message:"Appointment booked",success:true,data:newAppointment})
  }
  catch(error){
    console.log(error);
    res.status(500).send({message:"Something went wrong while booking appoinment",success:true,error});
  }
}
export const appointmentController=async(req,res)=>{
  try{
    const appointments=await appointmentModel.find({userId:req.body.userId});
    res.status(200).send({message:"Appointments fetched Successfully",success:true,data:appointments})
  }
  catch(error){
    res.status(500).send({message:"Error while getting appointments",success:true,error});
  }
}
export const uploadImageController=async(req,res)=>{
  try{
    const {path:imageURL}=req.file;
    const result=await userModel.findByIdAndUpdate(req.body.userId,{profileImage:imageURL});
    const doctor=await doctorModel.find({userId:req.body.userId})
    console.log(doctor);
    if(doctor[0]){
      console.log('bhj')
      const newdoc=await doctorModel.findByIdAndUpdate(doctor[0]._id,{profileImage:imageURL});
    }
    res.status(200).send({message:"Image uploaded Successfully",success:true});
  }
  catch(error){
    res.status(500).send({message:"something error while uploading image",success:false});
  }
}
export const getTokenController=async(req,res)=>{
    try{
      console.log(req);
      const token = req.cookies.token;
      console.log(token);
    if (!token) {
      return res.status(400).send({ message: 'Token not found in cookies' ,success:true});
    }
    res.status(200).send({ token:token,success:true ,message:"token find"});
    }
    catch(error){
      res.status(500).send({message:"Error while fetching token",error,success:false});
    }
}
export const logoutController=async(req,res)=>{
  try{
    res.clearCookie('token');
    res.status(200).send({message:"successfully logout",success:true});
  }
  catch(error){
    res.status(500).send({message:"Error while logout",success:false,error});
  }
}
export const checkAvailabilityController=async(req,res)=>{
  try{
    
    const sTime=moment(req.body.doctorInfo.timing[0],"HH:mm").toISOString();
    const eTime=moment(req.body.doctorInfo.timing[1],"HH:mm").toISOString();
    const bTime=moment(req.body.time,"HH:mm").toISOString();
    const date=moment(req.body.date,"DD-MM-YYYY").toISOString();
    const fromTime=moment(req.body.time,"HH:mm").subtract(30,"minutes").toISOString();
    const toTime=moment(req.body.time,"HH:mm").add(30,"minutes").toISOString();
    const doctorId=req.body.doctorId;
   
    if(req.body.userId===req.body.doctorInfo.userId){return res.status(200).send({ message: "YOU CAN NOT TAKE APPOINTMENT WITH YOURSELF", success: false });}
    if (moment().isAfter(bTime) && moment().isAfter(date)) {
      return res.status(200).send({ message: "PLEASE SELECT FUTURE DATE", success: false });
    }
    if(bTime<sTime || bTime>eTime) return res.status(200).send({message:"DOCTOR NOT AVAILABLE ",success:false})
    const appoinments=await appointmentModel.find({doctorId,date,
    time:{
      $gte:fromTime,
      $lte:toTime,
    }});
    if(appoinments.length>0){
      return res.status(200).send({message:"SLOT NOT AVAILABLE,CHOOSE ANOTHER SLOT", success:false});
     
    }
    return res.status(200).send({message:"SLOT Available",success:true})

  }
  catch(error){
    res.status(500).send({message:"Error while checking availability",success:false,error});
  }
}
// export default {registerController, loginController};
