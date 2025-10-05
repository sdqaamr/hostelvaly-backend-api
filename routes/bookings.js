import express from "express";
import {
  getBookings,
  getBooking,
  editBooking,
  addBooking,
  deleteBooking,
} from "../controllers/bookings.js";
import validateId from "../middlewares/validateId.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";
import checkBannedUser from "../middlewares/checkBanned.js";
import { checkRequestBody } from "../middlewares/validateRequest.js";
const router = express.Router();

router.get(
  "/",
  verifyToken,
  checkBannedUser,
  authorizeRoles({ admin: true, owner: false, student: false }, "Bookings"),
  getBookings
);
router.get(
  "/:id",
  verifyToken,
  validateId,
  checkBannedUser,
  authorizeRoles({ admin: true, owner: true, student: "own" }, "Bookings"),
  getBooking
);
router.post(
  "/",
  verifyToken,
  checkBannedUser,
  checkRequestBody,
  addBooking
);
router.put(
  "/:id",
  verifyToken,
  validateId,
  checkBannedUser,
  authorizeRoles({ admin: true, owner: "own", student: "own" }, "Bookings"),
  checkRequestBody,
  editBooking
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles({ admin: true, owner: "own", student: "own" }, "Bookings"),
  validateId,
  checkBannedUser,
  deleteBooking
);

export default router;
