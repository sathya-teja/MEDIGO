import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';

// API for adding DOCTOR
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const image = req.file;

        // Check for all required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !image) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Check if doctor with email already exists
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.json({ success: false, message: "Doctor with this email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(image.path, {
            resource_type: "image"
        });
        const imageUrl = imageUpload.secure_url;

        // Create doctor object
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: new Date()
        };

        // Save to database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor added successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message:error.message });
    }
};

// api for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check for all required fields
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({ success: true,token });

        }else{
            res.json({ success: false, message: "Invalid credentials" });
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message:error.message });
    }
}

export { addDoctor,loginAdmin };
