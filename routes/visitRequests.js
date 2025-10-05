import express from "express";
import {
  getVisitRequests,
  getVisitRequest,
  createVisitRequest,
  editVisitRequest,
  deleteVisitRequest,
} from "../controllers/visitRequests.js";
import validateId from "../middlewares/validateId.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";
import checkBannedUser from "../middlewares/checkBanned.js";
import { checkRequestBody } from "../middlewares/validateRequest.js";
const router = express.Router();

router.get("/", verifyToken, authorizeRoles("admin"), getVisitRequests);
router.get("/:id", validateId, verifyToken, getVisitRequest);
router.post("/",verifyToken, checkBannedUser, checkRequestBody, createVisitRequest);
router.put("/:id", verifyToken, validateId, checkBannedUser, checkRequestBody, editVisitRequest);
router.delete("/:id", validateId, deleteVisitRequest);

export default router;
