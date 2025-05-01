import express from "express";
import { verificarToken, permitirRoles } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/",
  verificarToken,
  permitirRoles("admin", "cashier", "manager"),
  (req, res) => {
    res.json({ menssage: "Bienvenido al Dshboard" });
  },
);

export default router;
