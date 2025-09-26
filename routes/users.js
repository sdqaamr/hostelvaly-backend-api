import express from "express";
import {
  getUsers,
  getProfile,
  register,
  verifyEmail,
  resendOtp,
  loginUser,
  changePassword,
  updateProfile,
  logout,
  toggleUserStatus,
} from "../controllers/users.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";
import checkBannedUser from "../middlewares/checkBanned.js";
import { checkRequestBody } from "../middlewares/validateRequest.js";
import validateId from "../middlewares/validateId.js";
const router = express.Router();

router.get("/", verifyToken, authorizeRoles("admin"), getUsers);
router.get("/me", verifyToken, getProfile);
router.post("/register", checkRequestBody, register);
router.post("/verify-email", checkRequestBody, verifyEmail);
router.post("/resend-otp", checkRequestBody, resendOtp);
router.post("/login", checkRequestBody, loginUser);
router.put("/", verifyToken, checkBannedUser, checkRequestBody, updateProfile);
router.put("/change-password", verifyToken, checkBannedUser, checkRequestBody, changePassword);
router.delete("/logout", verifyToken, logout);
router.patch(
  "/:id/toggle",
  verifyToken,
  validateId,
  authorizeRoles("admin"), // Only admins can toggle
  toggleUserStatus
);

export default router;
