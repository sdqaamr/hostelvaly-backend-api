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
const router = express.Router();

router.get("/", getVisitRequests);
router.get("/:id", validateId, getVisitRequest);
router.put("/:id", validateId, putVisitRequest);
router.post("/", postVisitRequests);
router.delete("/:id", validateId, deleteVisitRequest);
router.delete("/", deleteVisitRequests);

export default router;
