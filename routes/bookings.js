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
const router = express.Router();

router.get("/", getBookings);
router.get("/:id", validateId, getBooking);
router.put("/:id", validateId, putBooking);
router.post("/", postBookings);
router.delete("/:id", validateId, deleteBooking);
router.delete("/", deleteBookings);

export default router;
