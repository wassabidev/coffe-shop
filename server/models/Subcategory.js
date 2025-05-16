import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: {
    type: String,
  },
  deletedAt: {
    type: Date,
  },
});

export default mongoose.model("Subcategory", SubcategorySchema);
