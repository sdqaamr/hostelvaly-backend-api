import express from "express";
import {
  getHostels,
  getHostel,
  addNewHostel,
  updateHostel,
  deleteHostel,
} from "../controllers/hostels.js";
import validateId from "../middlewares/validateId.js";
import { authorizeRoles, verifyToken } from "../middlewares/auth.js";
import checkBannedUser from "../middlewares/checkBanned.js";
import { checkRequestBody } from "../middlewares/validateRequest.js";
const router = express.Router();

router.get("/", getHostels);
router.get("/:id", validateId, getHostel);
router.post("/", verifyToken, checkBannedUser, checkRequestBody, addNewHostel);
router.put(
  "/:id",
  verifyToken,
  validateId,
  checkBannedUser,
  authorizeRoles({ admin: true, owner: "own", student: false }, "Hostels"),
  checkRequestBody,
  updateHostel
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles({ admin: true, owner: "own", student: false }, "Hostels"),
  checkBannedUser,
  validateId,
  deleteHostel
);

export default router;
