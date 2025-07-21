import express from "express";
import {
  getUsers,
  getUser,
  putUser,
  postUsers,
  deleteUser,
  deleteUsers,
} from "../controllers/users.js";
import validateId from "../middlewares/validateId.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", validateId, getUser);
router.put("/:id", validateId, putUser);
router.post("/", postUsers);
router.delete("/:id", validateId, deleteUser);
router.delete("/", deleteUsers);

export default router;
