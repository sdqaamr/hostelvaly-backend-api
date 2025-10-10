import express from "express";
import {
  getVisitRequests,
  getVisitRequest,
  createVisitRequest,
  toggleWhatsappUpdates,
  toggleRequestStatus,
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
    "VisitRequests"
  ),
  getVisitRequests
);
router.get(
  "/:id",
  validateId,
  verifyToken,
  authorizeRoles({ admin: true, owner: true, student: "own" }, "VisitRequests"),
  getVisitRequest
);
router.post(
  "/",
  verifyToken,
  checkBannedUser,
  checkRequestBody,
  createVisitRequest
);
router.patch(
  "/:id/whatsapp",
  verifyToken,
  validateId,
  authorizeRoles(
    { admin: "own", owner: "own", student: "own" },
    "VisitRequests"
  ),
  toggleWhatsappUpdates
);
router.patch(
  "/:id/status",
  verifyToken,
  validateId,
  checkBannedUser,
  authorizeRoles(
    { admin: true, owner: "own", student: "own" },
    "VisitRequests"
  ),
  checkRequestBody,
  toggleRequestStatus
);
router.put(
  "/:id",
  verifyToken,
  validateId,
  checkBannedUser,
  authorizeRoles(
    { admin: true, owner: "own", student: "own" },
    "VisitRequests"
  ),
  checkRequestBody,
  editVisitRequest
);
router.delete("/:id", validateId, deleteVisitRequest);

export default router;
