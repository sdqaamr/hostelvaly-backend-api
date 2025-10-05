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

router.get(
  "/",
  verifyToken,
  authorizeRoles(
    { admin: true, owner: false, student: false },
    "VisistRequests"
  ),
  getVisitRequests
);
router.get(
  "/:id",
  validateId,
  verifyToken,
  authorizeRoles(
    { admin: true, owner: true, student: "own" },
    "VisistRequests"
  ),
  getVisitRequest
);
router.post(
  "/",
  verifyToken,
  checkBannedUser,
  checkRequestBody,
  createVisitRequest
);
router.put(
  "/:id",
  verifyToken,
  validateId,
  checkBannedUser,
  authorizeRoles(
    { admin: true, owner: "own", student: "own" },
    "VisistRequests"
  ),
  checkRequestBody,
  editVisitRequest
);
router.delete("/:id", validateId, deleteVisitRequest);

export default router;
