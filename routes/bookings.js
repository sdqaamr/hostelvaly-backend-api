import express from "express";
import {
  getBookings,
  getBooking,
  editBooking,
  addBooking,
  cancelBooking,
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
  authorizeRoles("owner"),
  getBookings
);
router.get("/:id", verifyToken, checkBannedUser, validateId, getBooking);
router.post(
  "/create",
  verifyToken,
  checkBannedUser,
  checkRequestBody,
  addBooking
);
router.put(
  "/update/:id",
  verifyToken,
  checkBannedUser,
  validateId,
  checkRequestBody,
  editBooking
);
router.delete(
  "/cancel/:id",
  verifyToken,
  checkBannedUser,
  validateId,
  cancelBooking
);

export default router;
