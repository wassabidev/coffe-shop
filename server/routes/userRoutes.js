import express from "express";
import {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
