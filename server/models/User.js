import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
      required: true,
    },
    lastLogin: {
      type: Date,
    },
    deactivatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", UserSchema);
