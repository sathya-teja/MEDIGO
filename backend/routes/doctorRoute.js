import express from 'express';
import { doctorList,loginDoctor,appoinmentsDoctor,appoinmentCancel,appoinmentComplete,doctordashboard } from '../controllers/doctorController.js';
import doctorModel from '../models/doctorModel.js';
import authDoctor from '../middlewares/authDoctor.js';


const doctorRouter = express.Router();

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appoinmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appoinmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appoinmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctordashboard)


export default doctorRouter;