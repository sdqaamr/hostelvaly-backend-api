import express from "express";
import {
  getVisitRequests,
  getVisitRequest,
  putVisitRequest,
  postVisitRequests,
  deleteVisitRequest,
  deleteVisitRequests,
} from "../controllers/visitRequests.js";
import validateId from "../middlewares/validateId.js";
import verifyToken from "../middlewares/auth.js";
const router = express.Router();

router.get("/", getVisitRequests);
router.get("/:id", validateId, getVisitRequest);
router.put("/:id", validateId, verifyToken, putVisitRequest);
router.post("/", verifyToken, postVisitRequests);
router.delete("/:id", validateId, verifyToken, deleteVisitRequest);
router.delete("/", verifyToken, deleteVisitRequests);

export default router;
