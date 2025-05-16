import express from "express";
import {
  createSubcategory,
  getCategories,
} from "../controllers/subcategoriesController.js";

const router = express.Router();

router.post("/", createSubcategory);
router.get("/", getCategories);

export default router;
