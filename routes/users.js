import express from "express";
import {
  
  getProfile,
  signupUser,
  loginUser,
  updateProfile,
  changePassword,
  logout,
  
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

router.get("/me", verifyToken, getProfile);
router.post("/register", signupUser);
router.post("/login", loginUser);
router.put("/", verifyToken, updateProfile);
router.put("/change-password", verifyToken, changePassword);
router.delete("/logout", verifyToken, logout);

export default router;
