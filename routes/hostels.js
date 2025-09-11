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
const router = express.Router();

router.get("/", getHostels);
router.get("/:id", validateId, getHostel);
router.post("/", verifyToken, addNewHostel);
router.put("/:id", verifyToken, validateId, updateHostel);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "owner"),
  validateId,
  deleteHostel
);

export default router;
