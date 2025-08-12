import express from "express";
import {
  getHostels,
  getHostel,
  addNewHostel,
  updateHostel,
  deleteHostel,
  deleteHostels,
} from "../controllers/hostels.js";
import validateId from "../middlewares/validateId.js";
import {verifyAdmin, verifyOwner, verifyToken} from "../middlewares/auth.js";
const router = express.Router();

router.get("/all-data", getHostels);
router.get("/:id", validateId, getHostel);
router.post("/add-new", verifyToken, addNewHostel);
router.put("/update-hostel/:id", verifyToken, verifyOwner, validateId, updateHostel);
router.delete("/:id", verifyToken, verifyOwner, validateId, deleteHostel);
router.delete("/", verifyToken, verifyAdmin, deleteHostels);

export default router;
