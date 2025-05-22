import express from "express";
import {
  createSubcategory,
  getsubCategories,
  getsubCategoryById,
  deletesubCategory,
  updatesubCategory,
} from "../controllers/subcategoriesController.js";

const router = express.Router();

router.post("/", createSubcategory);
router.get("/", getsubCategories);
router.get("/:id", getsubCategoryById);
router.delete("/:id", deletesubCategory);
router.put("/:id", updatesubCategory);

router.delete("/:id", deletesubCategory);

export default router;
