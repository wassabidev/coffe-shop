import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  getOrderByUserId,
} from "../controllers/orderController.js";
import { verificarToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/", verificarToken, createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/user/:id", getOrderByUserId);

export default router;
