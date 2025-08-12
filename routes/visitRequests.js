import express from "express";
import {
  getVisitRequests,
  getVisitRequest,
  createVisitRequest,
  editVisitRequest,
  cancelVisitRequest,
  deleteVisitRequests,
} from "../controllers/visitRequests.js";
import validateId from "../middlewares/validateId.js";
import {verifyToken, verifyAdmin} from "../middlewares/auth.js";
const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getVisitRequests);
router.get("/:id", validateId, getVisitRequest);
router.post("/create-new", createVisitRequest);
router.put("/update/:id", validateId, editVisitRequest);
router.delete("/cancel/:id", validateId, cancelVisitRequest);
router.delete("/", verifyToken, verifyAdmin, deleteVisitRequests);

export default router;
