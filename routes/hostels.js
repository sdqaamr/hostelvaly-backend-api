import express from "express";
import {
  getHostels,
  getHostel,
  putHostel,
  postHostel,
  deleteHostel,
  deleteHostels,
} from "../controllers/hostels.js";
import validateId from "../middlewares/validateId.js";
import verifyToken from "../middlewares/auth.js";
const router = express.Router();

router.get("/", getHostels);
router.get("/:id", validateId, getHostel);
router.put("/:id", verifyToken, validateId, putHostel);
router.post("/", verifyToken, postHostel);
router.delete("/:id", validateId, verifyToken, deleteHostel);
router.delete("/", verifyToken, deleteHostels);

export default router;
