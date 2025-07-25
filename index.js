import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import hostelRoutes from './routes/hostels.js';
import userRoutes from './routes/users.js';
import bookingRoutes from './routes/bookings.js';
import visitRequestRoutes from './routes/visitRequests.js';
import reviewRoutes from './routes/reviews.js';
import dbConnect from './config/database.js';
import cors from 'cors';

const corsOptions = {
    origin: process.env.APP_URL,
    optionsSuccessStatus: 200
}

const app = express();
app.use(express.json());
app.use(morgan("dev"));
dotenv.config({ path: '.example.env' });
app.use(cors(corsOptions));

dbConnect();

// Hostels
app.use("/api/hostels", hostelRoutes);

// Users
app.use("/api/users", userRoutes);

// Bookings
app.use("/api/bookings", bookingRoutes);

// VisitRequests
app.use("/api/visitRequests", visitRequestRoutes);

// Reviews
app.use("/api/reviews", reviewRoutes);


const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
app.listen(port, host, ()=>{
    console.log(`Server is running on http://${host}:${port}`);
});