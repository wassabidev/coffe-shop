import mongoose from "mongoose";

const RolesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("Roles", RolesSchema);
