import mongoose from "mongoose";

const FavoritesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
FavoritesSchema.index({ user: 1, product: 1 }, { unique: true });

export default mongoose.model("Favorites", FavoritesSchema);
