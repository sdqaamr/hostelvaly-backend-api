import express from "express";
import {
  getBookings,
  getBooking,
  editBooking,
  addBooking,
  cancelBooking,
  deleteBookings,
} from "../controllers/bookings.js";
import validateId from "../middlewares/validateId.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

router.get("/", verifyToken, getBookings);
router.get("/:id", verifyToken, validateId, getBooking);
router.post("/create", verifyToken, addBooking);
router.put("/update/:id", verifyToken, validateId, editBooking);
router.delete("/cancel/:id", verifyToken, validateId, cancelBooking);
router.delete("/", verifyToken, deleteBookings);

export default router;
