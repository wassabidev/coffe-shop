import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    subcategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Category", CategorySchema);
