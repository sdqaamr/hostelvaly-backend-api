import express from "express";
import { signupUser, loginUser } from "../controllers/users.js";

const router = express.Router();

router.post("/register", signupUser);
router.post("/login", loginUser);

export default router;
