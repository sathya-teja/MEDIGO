import express from 'express';
import { addDoctor,allDoctors,loginAdmin,appointemntsAdmin,appointmentCancel } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';


const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',changeAvailability)
adminRouter.get('/appointments',authAdmin,appointemntsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)


export default adminRouter;