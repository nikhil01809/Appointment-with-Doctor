import appointmentModel from "../model/appointmentModel.js";
import doctorModel from "../model/doctorModel.js";
import userModel from "../model/userModel.js";
import moment from "moment";
export const getDoctorInfoController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOne({userId:req.body.userId})
        res.status(200).send({message:"Fetched Successfully",success:true,data:doctor});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message:"something wrong in fetching doctor data",success:false,error});
    }
}
export const updateProfileController = async (req, res) => {
    try {
      const doctor = await doctorModel.findOneAndUpdate(
        { userId: req.body.userId },
        req.body
      );
      res.status(201).send({
        success: true,
        message: "Doctor Profile Updated",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Doctor Profile Update issue",
        error,
      });
    }
  };

  export const getDoctorByIdController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOne({_id:req.body.doctorId});
        res.status(200).send({message:"doctor found",success:true,data:doctor});
    }
    catch(error){
      res.status(500).send({message:"Error",success:false,error});
    }
  }
  export const doctorAppointmentController=async(req,res)=>{
    try{
      const doctor=await doctorModel.findOne({userId:req.body.userId})
      const appointments=await appointmentModel.find({doctorId:doctor._id})
      res.status(200).send({message:"Succesfully fetched",success:true,data:appointments});
    }
    catch(error){
      res.status(500).send({message:"Error while fetching appointments list",success:false,error});
    }
  }
  export const updateStatusController=async(req,res)=>{
    try{
      console.log(req.body); 
      const {appointmentsId,status}=req.body;
      const appointments=await appointmentModel.findByIdAndUpdate(appointmentsId,{status});
      const user=await userModel.findOne({_id:appointments.userId});
      const notification=user.notification;
      
    notification.push({
      type:"status for appointment book",
      message:`Your appointment having id ${appointmentsId} has been ${status}`,
      onClickPath:"/doctor-appointment"
    })
    await user.save();
    res.status(200).send({message:"Status updated",success:true})

    }
    catch(error){
      res.status(500).send({message:"error while fupdating status",error,success:false});
    }
  }
  export const deleteAppointmentController=async(req,res)=>{
    try{
      const result= await appointmentModel.findOneAndDelete({_id:req.body.appointmentsId});
      res.status(200).send({message:"Deleted Succesffully",success:true});
    }
    catch(error){
      res.status(500).send({message:"Error while deleting appointment",success:false,error})
    }
  }