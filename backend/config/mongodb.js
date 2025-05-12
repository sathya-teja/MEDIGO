import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected',() => console.log('Database connected'));
    await mongoose.connect(`${process.env.MONGODB_URI}/medigo`);
    console.log("MongoDB URI: ", `${process.env.MONGODB_URI}/medigo`);

}

export default connectDB;