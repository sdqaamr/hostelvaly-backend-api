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
import config from "./config/config.js";

const corsOptions = {
  origin: config.appUrl,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

dbConnect();

// Hostels
app.use("/api/hostels/", hostelRoutes);

// Users
app.use("/api/auth/", apiRateLimit, userRoutes);

// Bookings
app.use("/api/bookings/", apiRateLimit, bookingRoutes);

// VisitRequests
app.use("/api/visitRequests/", apiRateLimit, visitRequestRoutes);

// Reviews
app.use("/api/reviews/", reviewRoutes);

// Handle 404 for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

const port = config.port || 3000;
const host = config.host || "localhost";
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
