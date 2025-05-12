import express from 'express';
import cors from 'cors';
import 'dotenv/config' 
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import userRouter from './routes/userRoute.js';

// app config
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();


// middleware
app.use(cors());
app.use(express.json());

// API endpoint

app.use('/api/admin',adminRouter);

app.use('/api/user',userRouter);

//localhost:5000/api/admin/add-doctor

app.get('/', (req, res) => {
  res.send('API WORKING! hello'); 
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});