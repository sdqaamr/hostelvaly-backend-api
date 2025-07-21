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
const router = express.Router();

router.get("/", getReviews);
router.get("/:id", validateId, getReview);
router.put("/:id", validateId, putReview);
router.post("/", postReviews);
router.delete("/:id", validateId, deleteReview);
router.delete("/", deleteReviews);

export default router;
