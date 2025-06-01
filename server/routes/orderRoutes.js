import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  getOrderByUserId,
} from "../controllers/orderController.js";
import { authenticate } from "../middleware/auth.js";
const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/user/:id", getOrderByUserId);

export default router;
