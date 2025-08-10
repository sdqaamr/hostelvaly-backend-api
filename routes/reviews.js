import express from "express";
import {
  getReviews,
  getReview,
  putReview,
  postReviews,
  deleteReview,
  deleteReviews,
} from "../controllers/reviews.js";
import validateId from "../middlewares/validateId.js";
import verifyToken from "../middlewares/auth.js";
const router = express.Router();

router.get("/", getReviews);
router.get("/:id", validateId, getReview);
router.put("/:id", validateId, verifyToken, putReview);
router.post("/", verifyToken, postReviews);
router.delete("/:id", validateId, verifyToken, deleteReview);
router.delete("/", verifyToken, deleteReviews);

export default router;
