import express from "express";
import {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviews.js";
import validateId from "../middlewares/validateId.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";
import checkBannedUser from "../middlewares/checkBanned.js";
import { checkRequestBody } from "../middlewares/validateRequest.js";
const router = express.Router();

router.get("/", getReviews);
router.get("/:id", validateId, getReview);
router.post("/", verifyToken, checkBannedUser, checkRequestBody, createReview);
router.put(
  "/:id",
  validateId,
  verifyToken,
  checkBannedUser,
  authorizeRoles({ admin: true, owner: "own", student: "own" }, "Reviews"),
  checkRequestBody,
  updateReview
);
router.delete(
  "/:id",
  verifyToken,
  validateId,
  authorizeRoles({ admin: true, owner: "own", student: "own" }, "Reviews"),
  deleteReview
);

export default router;
