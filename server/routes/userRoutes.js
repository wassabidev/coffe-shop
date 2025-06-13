import express from "express";
import {
  createUser,
  getUsers,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);

export default router;
