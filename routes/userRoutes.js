import express from "express"
import path from 'path';
import {applyDoctorController,getAllDoctorsController, authController, deleteAllNotification, loginController, notificationController, registerController, bookAppointmentController, appointmentController, uploadImageController, getTokenController, logoutController, checkAvailabilityController}from "../controllers/userCtrl.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import passport from "passport";
import multer from "multer"
import {storage} from "../cloudinary/index.js"


const router=express.Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const upload=multer({storage});
router.post('/login',loginController);
router.post('/register',registerController);
router.post('/gettoken',getTokenController)
router.post('/getUserData',authMiddleware,authController)
//  router.post('/getUser2',authMiddleware,auth2Controller)
router.post('/apply-doctor',authMiddleware,applyDoctorController)
router.post('/all-notification',authMiddleware,notificationController)
router.post('/delete-all-notification',authMiddleware,deleteAllNotification)
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)
router.post('/book-appointment',authMiddleware,bookAppointmentController)
router.post('/checkavailability',authMiddleware,checkAvailabilityController)
router.get('/appointments',authMiddleware,appointmentController)
router.get('/docphoto',authMiddleware,appointmentController)
router.post('/upload-image',upload.single("image"),authMiddleware,uploadImageController)
router.get('/logout',authMiddleware,logoutController)

// router.use(express.static(path.join(__dirname+"./public/")))

router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));


router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        const token = req.user.token;
        res.cookie('token', token, { httpOnly: true, maxAge: 86400000 }); // Max age: 1 day in milliseconds
        res.redirect('http://localhost:3000/login-success');  // Redirect to a success page
    });

export default router;
