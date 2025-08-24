import express from "express";
import {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  deleteReviews,
} from "../controllers/reviews.js";
import validateId from "../middlewares/validateId.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

router.get("/", getReviews);
router.get("/:id", validateId, getReview);
router.post("/add-new", verifyToken, createReview);
router.put("/update/:id", validateId, verifyToken, updateReview);
router.delete("/remove/:id", verifyToken, validateId, deleteReview);
router.delete("/", verifyToken, deleteReviews);

export default router;
