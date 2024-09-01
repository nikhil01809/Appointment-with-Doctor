import appointmentModel from "../model/appointmentModel.js";
import doctorModel from "../model/doctorModel.js";
import userModel from "../model/userModel.js";

export const getAllUsersController=async(req,res)=>{
    try{
        const result=await userModel.find({});
        res.status(200).send({message:"user lists",success:true,data:result});
    }
    catch(error){
        res.status(500).send({message:"error while fetching users",success:true,error});
    }
}

export const getAllDoctorsController=async(req,res)=>{
    try{
        const result=await doctorModel.find({});
        res.status(200).send({message:"Doctors list",success:true,data:result});
    }
    catch(error){
        res.status(400).send({message:"error while fetching doctors",success:true,error});
    }
}
export const changeAccountStatusController=async(req,res)=>{
    try{
        const {doctorId,status}=req.body;
        const doctor=await doctorModel.findByIdAndUpdate(doctorId,{status});
        const user=await userModel.findOne({_id:doctor.userId});
        const notification=user.notification;
        notification.push({
            type:"account-status-update",
            message:`Your doctor Account Request has  ${status}`,
            onClickPath:'/notification'
        })
        if(status==="approved"){
            user.isDoctor=true;
        }
        else user.isDoctor=true;
        await user.save();
        res.status(200).send({message:"Account Updated",success:true,data:doctor})

    }
    catch(error){
        res.status(501).send({message:"Error while updating status",success:false,error})
    }
}
export const doctorDeleteController=async(req,res)=>{
    try{
        console.log(req.body);
       const result=await doctorModel.findByIdAndDelete(req.body.doctorId);
       const resul =await appointmentModel.deleteMany({doctorId:req.body.doctorId});
       const user=await userModel.findOne({_id:result.userId});
       user.isDoctor=false;
       const notification=user.notification;
        notification.push({
            type:"account-status-update",
            message:`Your doctor Account Request has  been deleted by admin`,
            onClickPath:'/notification'
        })
       await user.save();
       res.status(200).send({message:"Doctor data deleted succesfully",success:true});
    }
    catch(error){
        res.status(500).send({message:"Error while blocking doctor",success:false,error});
    }
}
export const deleteUserController=async(req,res)=>{
    try{
        console.log(req.body);
        const user=await userModel.findOne({_id:req.body.usId});
        if(user?.isDoctor) return res.status(200).send({message:"User is doctor ,you can't block him directly,first block him as doctor",success:true});
        if(user?.isAdmin) return res.status(200).send({message:"User is Admin ,you can't block him",success:true});
        await userModel.findOneAndDelete({_id:req.body.usId});
        const appointments=appointmentModel.deleteMany({userId:req.body.usId});
        return res.status(200).send({message:"User deleted Succesfully",success:true});
    }
    catch(error){
        return res.status(200).send({message:"Error while deleting user",success:true,error});
    }
}