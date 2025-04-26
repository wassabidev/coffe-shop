import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());
connectDB();

app.use("/uploads", express.static("../public/uploads"));

app.use("/api/products", productRoutes);

app.use("/api", loginRoutes);
app.use("/api", loginRoutes);
app.use("/api", loginRoutes);

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
