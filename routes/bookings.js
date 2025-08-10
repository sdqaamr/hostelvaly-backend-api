import express from "express";
import {
  getBookings,
  getBooking,
  putBooking,
  postBookings,
  deleteBooking,
  deleteBookings,
} from "../controllers/bookings.js";
import validateId from "../middlewares/validateId.js";
import verifyToken from "../middlewares/auth.js";
const router = express.Router();

router.get("/", getBookings);
router.get("/:id", validateId, getBooking);
router.put("/:id", validateId, verifyToken, putBooking);
router.post("/", verifyToken, postBookings);
router.delete("/:id", validateId, verifyToken, deleteBooking);
router.delete("/", verifyToken, deleteBookings);

export default router;
