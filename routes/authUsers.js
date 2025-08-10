import express from "express";
import verifyToken from "../middlewares/auth.js";
import { signupUser, loginUser, changePassword } from "../controllers/users.js";

const router = express.Router();

router.post("/register", signupUser);
router.post("/login", loginUser);
router.put("/change-password", verifyToken, changePassword);

export default router;
