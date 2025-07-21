import express from "express";
import {
  getHostels,
  getHostel,
  putHostel,
  postHostels,
  deleteHostel,
  deleteHostels,
} from "../controllers/hostels.js";
import validateId from "../middlewares/validateId.js";
const router = express.Router();

router.get("/", getHostels);
router.get("/:id", validateId, getHostel);
router.put("/:id", validateId, putHostel);
router.post("/", postHostels);
router.delete("/:id", validateId, deleteHostel);
router.delete("/", deleteHostels);

export default router;
