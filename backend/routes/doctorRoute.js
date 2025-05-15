import express from 'express';
import { doctorList,loginDoctor } from '../controllers/doctorController.js';
import doctorModel from '../models/doctorModel.js';


const doctorRouter = express.Router();

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)


export default doctorRouter;