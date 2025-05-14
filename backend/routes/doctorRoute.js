import express from 'express';
import { doctorList } from '../controllers/doctorController.js';
import doctorModel from '../models/doctorModel.js';


const doctorRouter = express.Router();

doctorRouter.get('/list',doctorList)


export default doctorRouter;