import express from "express";
import morgan from "morgan";
import hostelRoutes from "./routes/hostels.js";
import userRoutes from "./routes/users.js";
import bookingRoutes from "./routes/bookings.js";
import visitRequestRoutes from "./routes/visitRequests.js";
import reviewRoutes from "./routes/reviews.js";
import { apiRateLimit } from "./middlewares/api-limit.js";
import dbConnect from "./config/database.js";
import cors from "cors";
import dotenv from "dotenv";
import jsonErrorHandler from "./middlewares/jsonErrorHandler.js";

const corsOptions = {
  origin: process.env.APP_URL,
  optionsSuccessStatus: 200,
};

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

// Connect to Database
dbConnect();

// Hostels
app.use("/api/hostels/", hostelRoutes);

// Users
app.use("/api/auth/", apiRateLimit, userRoutes);

// Bookings
app.use("/api/bookings/", apiRateLimit, bookingRoutes);

// VisitRequests
app.use("/api/visit-requests/", apiRateLimit, visitRequestRoutes);

// Reviews
app.use("/api/reviews/", reviewRoutes);

// Handle 404 for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "The requested endpoint does not exist",
    data: null,
    error: ["Route not found"],
  });
});

app.use(jsonErrorHandler);

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
