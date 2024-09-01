import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { deleteAppointmentController, doctorAppointmentController, getDoctorByIdController, getDoctorInfoController, updateProfileController, updateStatusController } from '../controllers/doctorCtrl.js';

const doctorRouter=express.Router();

doctorRouter.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)
doctorRouter.post('/updateDoctorInfo',authMiddleware,updateProfileController)
doctorRouter.post('/getDoctorById',authMiddleware,getDoctorByIdController)
doctorRouter.get('/doctor-appointment',authMiddleware,doctorAppointmentController)
doctorRouter.post('/update-status',authMiddleware,updateStatusController)
doctorRouter.post('/delete-appointment',authMiddleware,deleteAppointmentController)
export default doctorRouter;