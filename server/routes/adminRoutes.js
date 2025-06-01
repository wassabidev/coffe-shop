import express from "express";
import { authenticate, permitirRoles } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  permitirRoles("admin", "cashier", "manager"),
  (req, res) => {
    res.json({ menssage: "Bienvenido al Dshboard" });
  },
);

export default router;
