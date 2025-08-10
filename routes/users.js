import express from "express";
import {
  getUsers,
  getUser,
  putUser,
  deleteUser,
  deleteUsers,
} from "../controllers/users.js";
import validateId from "../middlewares/validateId.js";
import verifyToken from "../middlewares/auth.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", validateId, getUser);
router.put("/", verifyToken, putUser);
router.delete("/:id", verifyToken, validateId, deleteUser);
router.delete("/", verifyToken, deleteUsers);

export default router;
