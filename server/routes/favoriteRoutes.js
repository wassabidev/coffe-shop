import express from "express";
import {
  toggleFavorite,
  getFavorites,
} from "../controllers/favoriteController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticate, toggleFavorite);
router.get("/", authenticate, getFavorites);

export default router;
