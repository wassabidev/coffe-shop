import express from "express";
import {
  toggleFavorite,
  getFavorites,
  mergeFavorites,
} from "../controllers/favoriteController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticate, toggleFavorite);
router.get("/", authenticate, getFavorites);
router.get("/merge", authenticate, mergeFavorites);

export default router;
