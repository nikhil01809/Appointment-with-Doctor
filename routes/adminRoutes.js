import  express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { doctorDeleteController, changeAccountStatusController, getAllDoctorsController, getAllUsersController, deleteUserController } from "../controllers/adminCtrl.js";
const adminRouter=express.Router();

adminRouter.get('/getAllUsers' ,authMiddleware,getAllUsersController)
adminRouter.get('/getAllDoctors',authMiddleware,getAllDoctorsController)
adminRouter.post('/changeAccountStatus',authMiddleware,changeAccountStatusController)
adminRouter.post('/delete-doctor',authMiddleware,doctorDeleteController)
adminRouter.post('/delete-user',authMiddleware,deleteUserController)
export default adminRouter;