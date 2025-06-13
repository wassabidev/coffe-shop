import express from "express";
import {
  createRole,
  getRoles,
  getRoleById,
  deleteRole,
  updateRole,
} from "../controllers/roleController.js";
const router = express.Router();

router.post("/", createRole);
router.get("/", getRoles);
router.delete("/:id", deleteRole);
router.get("/:id", getRoleById);
router.put("/:id", updateRole);

export default router;
