import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

function dbConnect() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected!");
    })
    .catch(() => {
        console.log("MongoDB Connection failed!")
    });
};

export default dbConnect;