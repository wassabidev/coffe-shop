import mongoose from "mongoose";

const RolesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Roles", RolesSchema);
