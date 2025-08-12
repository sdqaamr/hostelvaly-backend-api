import express from "express";
import {
  getUsers,
  getProfile,
  signupUser,
  loginUser,
  updateProfile,
  changePassword,
  logout,
  deleteUsers, 
} from "../controllers/users.js";
import {verifyToken, verifyAdmin, verifyOwner} from "../middlewares/auth.js";
const router = express.Router();

router.get("/users", verifyToken, verifyAdmin, getUsers);
router.get("/me", verifyToken, getProfile);
router.post("/register", signupUser);
router.post("/login", loginUser);
router.put("/update-profile", verifyToken, updateProfile);
router.put("/change-password", verifyToken, changePassword);
router.delete("/logout", verifyToken, logout);
router.delete("/users", verifyToken, verifyAdmin, deleteUsers);

export default router;
